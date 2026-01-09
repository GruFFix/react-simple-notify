import { RefObject, useCallback, useLayoutEffect, useState } from 'react'
import { NotifyAlignment } from '../../types.ts'

import { configObservable } from '../../utils/configManager.ts'

const ATTR_DYNAMIC = 'data-dynamic'
const ATTR_REMOVAL_IN_PROGRESS = 'data-removal-in-progress'

export const useAnimate = (
  containerRef: RefObject<HTMLElement | null>,
  alignment: NotifyAlignment,
): {
  isRendered: boolean
} => {
  const { animationConfig } = configObservable.get()

  const [isRendered, setIsRendered] = useState<boolean>(false)

  const animateEntrance = useCallback(
    (node: Element): void => {
      if (node.hasAttribute(ATTR_DYNAMIC)) return

      const { duration, easing, keyframes } = animationConfig.enter

      const frames = keyframes({ node, alignment })

      node.animate(frames, { duration, easing }).onfinish = () => {
        node.removeAttribute('style')
      }
    },
    [alignment, animationConfig],
  )

  const animateExit = useCallback(
    (
      node: Node,
      previousSibling: Node | null,
      nextSibling: Node | null,
    ): void => {
      const element = node as HTMLElement
      if (element.hasAttribute?.(ATTR_REMOVAL_IN_PROGRESS)) return

      // Deep clone to preserve all children and styles
      const clone = node.cloneNode(true) as HTMLElement

      // SSR compatibility: check if window is available
      if (typeof window !== 'undefined') {
        // Get computed styles from original element
        const computedStyle = window.getComputedStyle(element)

        // Copy critical layout properties to prevent layout shift
        clone.style.width = computedStyle.width
        clone.style.height = computedStyle.height
        clone.style.margin = computedStyle.margin
        clone.style.padding = computedStyle.padding
      }

      const parentNode = nextSibling?.parentNode || previousSibling?.parentNode
      const referenceNode = nextSibling || previousSibling?.nextSibling || null

      if (parentNode) {
        parentNode.insertBefore(clone, referenceNode)
      } else {
        containerRef.current?.insertBefore(clone, null)
      }

      clone.setAttribute(ATTR_DYNAMIC, 'true')
      clone.setAttribute(ATTR_REMOVAL_IN_PROGRESS, 'true')

      const { duration, easing, keyframes } = animationConfig.exit

      const frames = keyframes({ node: clone, alignment })

      const animation = clone.animate(frames, { duration, easing })
      animation.onfinish = () => clone.remove()

      // Fallback cleanup in case animation fails
      setTimeout(() => {
        if (clone.parentNode) {
          clone.remove()
        }
      }, duration + 100)
    },
    [alignment, animationConfig, containerRef],
  )

  const onMutation = useCallback(
    (mutationsList: MutationRecord[]): void => {
      mutationsList.forEach(
        ({ addedNodes, removedNodes, previousSibling, nextSibling }) => {
          addedNodes.forEach((node) => animateEntrance(node as Element))

          removedNodes.forEach((node) =>
            animateExit(node, previousSibling, nextSibling),
          )
        },
      )
    },
    [animateEntrance, animateExit],
  )

  useLayoutEffect(() => {
    setIsRendered(true)

    // SSR compatibility: check if MutationObserver is available
    if (typeof MutationObserver === 'undefined') {
      return
    }

    if (containerRef.current) {
      const observer = new MutationObserver(onMutation)

      observer.observe(containerRef.current, { childList: true, subtree: true })

      return () => observer.disconnect()
    }
  }, [containerRef, onMutation])

  return { isRendered }
}

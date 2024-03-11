import { RefObject, useCallback, useLayoutEffect, useState } from 'react'
import { NotifyAlignment } from '../../types.ts'

import { configObservable } from '../../utils/configManager.ts'

const ATTR_DYNAMIC = 'data-dynamic'
const ATTR_REMOVAL_IN_PROGRESS = 'data-removal-in-progress'

export const useAnimate = (
  containerRef: RefObject<HTMLElement>,
  alignment: NotifyAlignment,
): {
  isRendered: boolean
} => {
  const { animationConfig } = configObservable.get()

  const [isRendered, setIsRendered] = useState<boolean>(false)

  const animateEntrance = (node: Element): void => {
    if (node.hasAttribute(ATTR_DYNAMIC)) return

    const { duration, easing, keyframes } = animationConfig.enter

    const frames = keyframes({ node, alignment })

    node.animate(frames, { duration, easing }).onfinish = () => {
      node.removeAttribute('style')
    }
  }

  const animateExit = (
    node: Node,
    previousSibling: Node | null,
    nextSibling: Node | null,
  ): void => {
    const clone = node.cloneNode(true) as HTMLElement
    const removalInProgress = clone.hasAttribute(ATTR_REMOVAL_IN_PROGRESS)

    if (removalInProgress) return

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

    clone.animate(frames, { duration, easing }).onfinish = () => clone.remove()
  }

  const onMutation = useCallback((mutationsList: MutationRecord[]): void => {
    mutationsList.forEach(
      ({ addedNodes, removedNodes, previousSibling, nextSibling }) => {
        addedNodes.forEach((node) => animateEntrance(node as Element))

        removedNodes.forEach((node) =>
          animateExit(node, previousSibling, nextSibling),
        )
      },
    )
  }, [])

  useLayoutEffect(() => {
    setIsRendered(true)

    if (containerRef.current) {
      const observer = new MutationObserver(onMutation)

      observer.observe(containerRef.current, { childList: true, subtree: true })

      return () => observer.disconnect()
    }
  }, [containerRef, onMutation])

  return { isRendered }
}

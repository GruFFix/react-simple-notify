import { RefObject, useCallback, useLayoutEffect, useState } from 'react'
import { NotifyAlignment } from '../../types.ts'

const ATTR_DYNAMIC = 'data-dynamic'
const ATTR_REMOVAL_IN_PROGRESS = 'data-removal-in-progress'

export const useAnimate = (
  containerRef: RefObject<HTMLElement>,
  alignment: NotifyAlignment,
): { isRendered: boolean } => {
  const [isRendered, setIsRendered] = useState<boolean>(false)

  const animateEntrance = (node: Element): void => {
    if (node.hasAttribute(ATTR_DYNAMIC)) return

    let keyframes = []
    let transformValue = ''
    let startPosition = ''
    let endPosition = ''

    node.setAttribute('style', 'overflow: hidden;')

    switch (alignment) {
      case NotifyAlignment.topLeft:
      case NotifyAlignment.bottomLeft:
        transformValue = 'translateX'
        startPosition = '-100%'
        endPosition = '0'
        break
      case NotifyAlignment.bottomCenter:
        transformValue = 'translateY'
        startPosition = '100%'
        endPosition = '0'
        break
      case NotifyAlignment.topCenter:
        transformValue = 'translateY'
        startPosition = '-100%'
        endPosition = '0'
        break
      default:
        transformValue = 'translateX'
        startPosition = '100%'
        endPosition = '0'
        break
    }

    keyframes = [
      { transform: `${transformValue}(${startPosition})`, opacity: 0 },
      { transform: `${transformValue}(${endPosition})`, opacity: 1 },
    ]

    node.animate(keyframes, { duration: 300 }).onfinish = () => {
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
    clone.style.transformOrigin = 'center'
    clone.style.overflow = 'hidden'

    clone.animate([{ height: `${clone.scrollHeight}px` }, { height: 0 }], {
      duration: 150,
      easing: 'linear',
    }).onfinish = () => clone.remove()
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

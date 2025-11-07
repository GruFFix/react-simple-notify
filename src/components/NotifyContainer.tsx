import { FC, memo, PropsWithChildren, useRef } from 'react'

import { useAnimate } from '../core/hooks/useAnimate.ts'
import { configObservable } from '../utils/configManager.ts'

import { NotifyAlignment } from '../types.ts'

interface NotifyContainerProps {
  alignment: NotifyAlignment
}

export const NotifyContainer: FC<PropsWithChildren<NotifyContainerProps>> =
  memo(({ alignment, children }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { reverse } = configObservable.get()

    const { isRendered } = useAnimate(containerRef, alignment)

    return (
      <div
        data-rsn-container
        data-alignment={alignment}
        data-reverse={reverse ? 'true' : 'false'}
        ref={containerRef}
        key={alignment}
      >
        {isRendered && children}
      </div>
    )
  })

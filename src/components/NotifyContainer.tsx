import { FC, memo, PropsWithChildren, useRef } from 'react'

import { useAnimate } from '../core/hooks/useAnimate.ts'
import { configObservable } from '../utils/configManager.ts'

import { NotifyAlignment } from '../types.ts'
import s from '../styles.module.css'

interface NotifyContainerProps {
  alignment: NotifyAlignment
}

export const NotifyContainer: FC<PropsWithChildren<NotifyContainerProps>> =
  memo(({ alignment, children }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { reverse } = configObservable.get()

    const { isRendered } = useAnimate(containerRef, alignment)

    const containerClassName = `${s.container} ${s[alignment]} ${reverse ? s.reverse : ''}`

    return (
      <div className={containerClassName} ref={containerRef} key={alignment}>
        {isRendered && children}
      </div>
    )
  })

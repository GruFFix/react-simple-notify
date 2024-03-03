import { FC, memo, PropsWithChildren, useRef } from 'react'

import { useAnimate } from '../core/hooks/useAnimate.ts'

import { NotifyAlignment, AnimationConfig } from '../types.ts'

import s from '../styles.module.css'

interface NotifyContainerProps {
  alignment: NotifyAlignment
  animationConfig?: AnimationConfig
}

export const NotifyContainer: FC<PropsWithChildren<NotifyContainerProps>> =
  memo(({ alignment, children, animationConfig }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { isRendered } = useAnimate(containerRef, alignment, animationConfig)

    const containerClassName = `${s.container} ${s[alignment]}`

    return (
      <div className={containerClassName} ref={containerRef} key={alignment}>
        {isRendered && children}
      </div>
    )
  })

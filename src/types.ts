import { FC, PropsWithChildren, ReactNode } from 'react'

export enum NotifyAlignment {
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  topCenter = 'top-center',
  bottomCenter = 'bottom-center',
}

export interface NotifyRenderArgs {
  id: string
  duration: number
  alignment: NotifyAlignment
  variant?: string
  onClose: () => void
}

export type RenderFunction = (args: NotifyRenderArgs) => ReactNode

export interface NotifyOptions {
  id: string
  duration?: number
  alignment: NotifyAlignment
  render: RenderFunction
  variant?: string
}

export type GroupedNotify = {
  [key in NotifyAlignment]: NotifyOptions[]
}

interface AnimationStageConfig {
  keyframes: ({
    node,
    alignment,
  }: {
    node: Element | HTMLElement
    alignment: NotifyAlignment
  }) => Keyframe[]
  easing: string
  duration: number
}

export interface AnimationConfig {
  enter: AnimationStageConfig
  exit: AnimationStageConfig
}

export interface ConfigProps {
  animationConfig: AnimationConfig
  notifyComponent: FC<PropsWithChildren<NotifyRenderArgs>>
  alignment: NotifyAlignment
  reverse: boolean
}

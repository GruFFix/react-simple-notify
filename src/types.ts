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
  onClose: () => void
  data?: unknown // For custom data that can be updated
  timeRemaining: number // Time remaining until auto-close (in ms), updates every 100ms
  dataTestId?: string
}

export type RenderFunction = (args: NotifyRenderArgs) => ReactNode

export interface NotifyOptions {
  id: string
  duration?: number
  alignment: NotifyAlignment
  render: RenderFunction
  pauseOnHover?: boolean
  data?: unknown // For custom data that can be updated
  dataTestId?: string
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
  maxNotifications: number
  pauseOnHover: boolean
}

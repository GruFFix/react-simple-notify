import { FC, memo } from 'react'
import { createPortal } from 'react-dom'

import { NotifyContainer } from './NotifyContainer.tsx'
import { Notify } from './Notify.tsx'

import { animationConfig as defaultAnimationConfig } from '../utils/animationConfig.ts'

import { useContainers } from '../hooks/useContainers.ts'
import { AnimationConfig, NotifyAlignment, NotifyProps } from '../types.ts'

interface NotifyContainersProps {
  animationConfig?: AnimationConfig
}

interface NotifyContainerProps {
  alignment: NotifyAlignment
  animationConfig?: AnimationConfig
  notifyGroup: NotifyProps[]
}

const NotifyContainerComponent: FC<NotifyContainerProps> = ({
  alignment,
  animationConfig,
  notifyGroup,
}) => (
  <NotifyContainer alignment={alignment} animationConfig={animationConfig}>
    {notifyGroup.map((notify) => (
      <Notify key={notify.id} {...notify} />
    ))}
  </NotifyContainer>
)

const areEqual = (
  prevProps: NotifyContainerProps,
  nextProps: NotifyContainerProps,
) => {
  return (
    prevProps.alignment === nextProps.alignment &&
    prevProps.notifyGroup.length === nextProps.notifyGroup.length
  )
}

const MemoizedNotifyContainer = memo(NotifyContainerComponent, areEqual)

export const NotifyContainers: FC<NotifyContainersProps> = memo(
  ({ animationConfig }) => {
    const { notifyGrouped, containers } = useContainers({
      unmountMs:
        animationConfig?.exit.duration || defaultAnimationConfig.exit.duration,
    })

    return containers.map((alignment) =>
      createPortal(
        <MemoizedNotifyContainer
          key={alignment}
          alignment={alignment as NotifyAlignment}
          animationConfig={animationConfig}
          notifyGroup={notifyGrouped?.[alignment] || []}
        />,
        document.body,
        alignment,
      ),
    )
  },
)

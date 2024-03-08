import { FC, memo } from 'react'
import { createPortal } from 'react-dom'

import { NotifyContainer } from './NotifyContainer.tsx'
import { Notify } from './Notify.tsx'

import { animationConfig as defaultAnimationConfig } from '../utils/animationConfig.ts'

import { useContainers } from '../hooks/useContainers.ts'
import {
  NotifyAlignment,
  NotifyContainersProps,
  NotifyOptions,
} from '../types.ts'

interface NotifyContainerProps extends NotifyContainersProps {
  alignment: NotifyAlignment
  notifyGroup: NotifyOptions[]
}

const NotifyContainerComponent: FC<NotifyContainerProps> = ({
  alignment,
  animationConfig,
  notifyGroup,
  notifyComponent,
}) => (
  <NotifyContainer alignment={alignment} animationConfig={animationConfig}>
    {notifyGroup.map((notify) => (
      <Notify notifyComponent={notifyComponent} key={notify.id} {...notify} />
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
  ({ animationConfig, notifyComponent, defaultAlignment }) => {
    const { notifyGrouped, containers } = useContainers({
      // defaultAlignment: defaultAlignment || NotifyAlignment.bottomLeft,
      unmountMs:
        animationConfig?.exit.duration || defaultAnimationConfig.exit.duration,
    })

    return containers.map((alignment) =>
      createPortal(
        <MemoizedNotifyContainer
          key={alignment}
          alignment={alignment || defaultAlignment}
          animationConfig={animationConfig}
          notifyGroup={notifyGrouped?.[alignment] || []}
          notifyComponent={notifyComponent}
        />,
        document.body,
        alignment,
      ),
    )
  },
)

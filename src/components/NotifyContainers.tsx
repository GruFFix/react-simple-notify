import { FC, memo } from 'react'
import { createPortal } from 'react-dom'

import { NotifyContainer } from './NotifyContainer.tsx'
import { Notify } from './Notify.tsx'

import { animationConfig as defaultAnimationConfig } from '../utils/animationConfig.ts'

import { useContainers } from '../hooks/useContainers.ts'
import { AnimationConfig, NotifyAlignment } from '../types.ts'

interface NotifyContainersProps {
  animationConfig?: AnimationConfig
}

export const NotifyContainers: FC<NotifyContainersProps> = memo(
  ({ animationConfig }) => {
    const { notifyGrouped, containers } = useContainers({
      unmountMs:
        animationConfig?.exit.duration || defaultAnimationConfig.exit.duration,
    })

    return containers.map((alignment) =>
      createPortal(
        <NotifyContainer
          key={alignment}
          alignment={alignment as NotifyAlignment}
          animationConfig={animationConfig}
        >
          {notifyGrouped?.[alignment]?.map((notify) => (
            <Notify key={notify.id} {...notify} />
          ))}
        </NotifyContainer>,
        document.body,
      ),
    )
  },
)

import React, { memo, useEffect } from 'react'

import { useNotifyActions } from '../hooks/useNotifyActions.ts'

import { NotifyContainersProps, NotifyOptions } from '../types.ts'
import s from '../styles.module.css'

interface NotifyComponentProps extends NotifyOptions {
  notifyComponent?: NotifyContainersProps['notifyComponent']
}

export const Notify: React.FC<NotifyComponentProps> = memo(
  ({ id, duration = 0, render, notifyComponent }) => {
    const { closeNotify } = useNotifyActions()

    const isAutoClose = duration > 0

    useEffect(() => {
      if (isAutoClose) {
        const timer = setTimeout(() => {
          closeNotify(id)
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [id, duration, closeNotify, isAutoClose])

    const params = {
      id,
      duration,
      onClose: () => closeNotify(id),
    }

    let renderComponent

    if (render) {
      renderComponent = render(params)
    } else if (React.isValidElement(notifyComponent)) {
      renderComponent = React.cloneElement(notifyComponent, params)
    } else if (typeof notifyComponent === 'function') {
      renderComponent = notifyComponent(params)
    } else {
      renderComponent = null
    }

    if (renderComponent) {
      return <div className={s.notify}>{renderComponent}</div>
    }

    return null
  },
)

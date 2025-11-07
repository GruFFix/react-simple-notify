import React, { memo, useEffect } from 'react'

import { closeNotify } from '../utils/notifiesManager.ts'
import { configObservable } from '../utils/configManager.ts'

import { NotifyOptions } from '../types.ts'

export const Notify: React.FC<NotifyOptions> = memo(
  ({ id, duration = 0, render, variant, alignment }) => {
    const { notifyComponent } = configObservable.get()

    const isAutoClose = duration > 0

    useEffect(() => {
      if (isAutoClose) {
        const timer = setTimeout(() => {
          closeNotify(id)
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [id, duration, isAutoClose])

    const params = {
      id,
      duration,
      variant,
      alignment,
      onClose: () => closeNotify(id),
    }

    let content = render(params)

    if (typeof notifyComponent === 'function') {
      content = React.createElement(notifyComponent, params, content)
    } else if (React.isValidElement(notifyComponent)) {
      content = React.cloneElement(notifyComponent, params, content)
    }

    return <div data-rsn-notify>{content}</div>
  },
)

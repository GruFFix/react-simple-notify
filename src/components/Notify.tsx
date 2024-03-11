import React, { memo, useEffect } from 'react'

import { closeNotify } from '../utils/notifiesManager.ts'
import { configObservable } from '../utils/configManager.ts'

import { NotifyOptions } from '../types.ts'

import s from '../styles.module.css'

export const Notify: React.FC<NotifyOptions> = memo(
  ({ id, duration = 0, render }) => {
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
      onClose: () => closeNotify(id),
    }

    let content = render(params)

    if (typeof notifyComponent === 'function') {
      content = notifyComponent({ ...params, children: content })
    } else if (React.isValidElement(notifyComponent)) {
      content = React.cloneElement(notifyComponent, params, content)
    }

    return <div className={s.notify}>{content}</div>
  },
)

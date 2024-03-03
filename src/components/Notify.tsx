import React, { useEffect } from 'react'

import { useNotifyActions } from '../hooks/useNotifyActions.ts'

import { NotifyProps } from '../types.ts'
import s from '../styles.module.css'

export const Notify: React.FC<NotifyProps> = React.memo(
  ({ id, duration, render }) => {
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

    return (
      <div className={s.notify}>
        {render({
          id,
          duration,
          onClose: () => closeNotify(id),
        })}
      </div>
    )
  },
)

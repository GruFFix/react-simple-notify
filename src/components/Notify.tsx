import React, { useEffect } from 'react'

import { useNotifyActions } from '../hooks/useNotifyActions.ts'

import { NotifyProps } from '../types.ts'

export const Notify: React.FC<NotifyProps> = React.memo(
  ({ id, duration, render }) => {
    const { closeNotify } = useNotifyActions()

    useEffect(() => {
      const timer = setTimeout(() => {
        closeNotify(id)
      }, duration)

      return () => clearTimeout(timer)
    }, [id, duration, closeNotify])

    return (
      <div>
        {render({
          id,
          duration,
        })}
      </div>
    )
  },
)

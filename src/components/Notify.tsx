import React, { useEffect } from 'react'

import { useNotification } from "../hooks/useNotification.tsx";

import { NotifyProps } from "../types.ts";

export const Notify: React.FC<NotifyProps> = React.memo(
  ({ id, duration, render }) => {
    const { closeNotify } = useNotification()

    useEffect(() => {
      const timer = setTimeout(() => {
        closeNotify(id)
      }, duration)

      return () => clearTimeout(timer)
    }, [id, duration, closeNotify])

    return <div>{render({ id })}</div>
  },
)

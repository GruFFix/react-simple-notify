import { useCallback } from 'react'

import { NotifyOptions } from '../types'
import { useNotifyStore } from './useNotifyStore'

const generateUUID = () => Math.random().toString(36).substring(2, 15)

export const useNotifyActions = () => {
  const { notify } = useNotifyStore()

  const openNotify = useCallback(
    (options: Omit<NotifyOptions, 'id'> & { id?: string }) => {
      const id = options.id || generateUUID()

      notify.set((currentNotifies) => [...currentNotifies, { ...options, id }])
    },
    [notify],
  )

  const closeNotify = useCallback(
    (id: string) => {
      notify.set((currentNotifies) =>
        currentNotifies.filter((n) => n.id !== id),
      )
    },
    [notify],
  )

  const closeAllNotify = useCallback(() => {
    notify.set([])
  }, [notify])

  return {
    openNotify,
    closeNotify,
    closeAllNotify,
  }
}

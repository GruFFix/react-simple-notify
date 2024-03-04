import { useCallback } from 'react'

import { NotifyOptions } from '../types'
import { useNotifyStore } from './useNotifyStore'

const generateUUID = () => Math.random().toString(36).substring(2, 15)

export const useNotifyActions = () => {
  const { notify } = useNotifyStore()

  const openNotify = useCallback(
    (options: Omit<NotifyOptions, 'id'> & { id?: string }) => {
      const id = options.id || generateUUID()

      notify.set((currentNotifies) => {
        const newNotifies = new Map(currentNotifies)
        newNotifies.set(id, { ...options, id })
        return newNotifies
      })
    },
    [notify],
  )

  const closeNotify = useCallback(
    (id: string) => {
      notify.set((currentNotifies) => {
        const newNotifies = new Map(currentNotifies)

        newNotifies.delete(id)
        return newNotifies
      })
    },
    [notify],
  )

  const closeAllNotify = useCallback(() => {
    notify.set(new Map())
  }, [notify])

  return {
    openNotify,
    closeNotify,
    closeAllNotify,
  }
}

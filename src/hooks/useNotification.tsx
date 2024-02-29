import { useContext } from 'react'

import { NotifyContext } from "../types.ts";


export const useNotification = () => {
  const context = useContext(NotifyContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }
  return context
}

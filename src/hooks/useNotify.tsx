import { useNotifyActions } from './useNotifyActions.ts'

export const useNotify = () => {
  const { openNotify, closeNotify, closeAllNotify } = useNotifyActions()

  const notify = {
    open: openNotify,
    close: closeNotify,
    closeAll: closeAllNotify,
  }

  return { notify }
}

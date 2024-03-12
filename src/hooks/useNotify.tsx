import { openNotify, closeNotify, closeAll } from '../utils/notifiesManager.ts'

export const useNotify = () => {
  const notify = {
    open: openNotify,
    close: closeNotify,
    closeAll: closeAll,
  }

  return { notify }
}

import { openNotify, closeNotify } from '../utils/notifiesManager.ts'

export const useNotify = () => {
  const notify = {
    open: openNotify,
    close: closeNotify,
    closeAll: () => {},
  }

  return { notify }
}

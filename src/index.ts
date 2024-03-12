import { NotifyContainers } from './components/NotifyContainers.tsx'

import type { NotifyRenderArgs } from './types.ts'
import { NotifyAlignment } from './types.ts'

import { animationConfig } from './utils/animationConfig.ts'
import { setConfig, resetConfig } from './utils/configManager.ts'
import { closeAll, closeNotify, openNotify } from './utils/notifiesManager.ts'

const config = {
  set: setConfig,
  reset: resetConfig,
}

const notify = {
  open: openNotify,
  close: closeNotify,
  closeAll: closeAll,
}

export {
  NotifyContainers,
  NotifyAlignment,
  NotifyRenderArgs,
  animationConfig,
  config,
  notify,
}

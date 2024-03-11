import { useNotify } from './hooks/useNotify.tsx'
import { NotifyContainers } from './components/NotifyContainers.tsx'

import type { NotifyRenderArgs } from './types.ts'
import { NotifyAlignment } from './types.ts'

import { animationConfig } from './utils/animationConfig.ts'
import { setConfig, resetConfig } from './utils/configManager.ts'

const config = {
  set: setConfig,
  reset: resetConfig,
}

export {
  useNotify,
  NotifyContainers,
  NotifyAlignment,
  NotifyRenderArgs,
  animationConfig,
  config,
}

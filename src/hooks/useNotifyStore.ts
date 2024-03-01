import { createUseStore } from '../core/hooks/useStore.ts'
import { NotifyOptions } from '../types.ts'

type StoreState = {
  notify: Map<string, NotifyOptions>
}

const initialState = {
  notify: new Map(),
}

export const useNotifyStore = createUseStore<StoreState>(initialState)

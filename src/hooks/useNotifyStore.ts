import { createUseStore } from '../core/hooks/useStore.ts'
import { NotifyOptions } from '../types.ts'

type StoreState = {
  notify: NotifyOptions[]
}

const initialState = {
  notify: [],
}

export const useNotifyStore = createUseStore<StoreState>(initialState)

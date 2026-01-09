import { Observable } from './observable.ts'
import { ConfigProps, NotifyAlignment } from '../types.ts'

import { animationConfig } from './animationConfig.ts'
import { Fragment } from 'react'

const initConfig: ConfigProps = {
  alignment: NotifyAlignment.bottomLeft,
  animationConfig,
  notifyComponent: Fragment,
  reverse: false,
  maxNotifications: 0,
  pauseOnHover: false,
}

export const configObservable = new Observable<ConfigProps>(initConfig)

export const setConfig = (props: Partial<ConfigProps>) => {
  configObservable.set((prevConfig) => {
    return { ...prevConfig, ...props }
  })
}

export const resetConfig = () => {
  configObservable.set(initConfig)
}

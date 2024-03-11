import { Observable } from './observable.ts'
import { NotifyOptions } from '../types.ts'
import { configObservable } from './configManager.ts'

interface GroupedNotify {
  [key: string]: NotifyOptions[]
}

const groupTimers: { [key: string]: NodeJS.Timeout } = {}

export const notifyObservable = new Observable<GroupedNotify>({})

export const openNotify = (
  options: Omit<NotifyOptions, 'id'> & { id?: string },
) => {
  const id = Math.random().toString(36).substring(2, 15)
  const duration = options.duration || 5000
  const alignment = options.alignment || configObservable.get().alignment

  const newNotify = { ...options, id, duration, alignment }

  notifyObservable.set((prev) => {
    const updated = { ...prev }

    if (updated[alignment]) {
      if (groupTimers[alignment]) {
        clearTimeout(groupTimers[alignment])
        delete groupTimers[alignment]
      }
      updated[alignment] = [...updated[alignment], newNotify]
    } else {
      updated[alignment] = [newNotify]
    }
    return updated
  })
}

export const closeNotify = (id: string) => {
  const { animationConfig } = configObservable.get()

  notifyObservable.set((prev) => {
    const updated = { ...prev }

    Object.keys(updated).forEach((alignment) => {
      updated[alignment] = updated[alignment].filter(
        (notify) => notify.id !== id,
      )

      if (updated[alignment].length === 0) {
        groupTimers[alignment] = setTimeout(() => {
          notifyObservable.set((prev) => {
            const updated = { ...prev }
            delete updated[alignment]
            return updated
          })
          delete groupTimers[alignment]
        }, animationConfig.exit.duration + 1000)
      }
    })

    return updated
  })
}

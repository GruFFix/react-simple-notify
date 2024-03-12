import { Observable } from './observable.ts'
import { NotifyAlignment, NotifyOptions } from '../types.ts'
import { configObservable } from './configManager.ts'

interface GroupedNotify {
  [key: string]: Map<string, NotifyOptions>
}

const groupTimers: { [key: string]: NodeJS.Timeout } = {}

export const notifyObservable = new Observable<GroupedNotify>({})

export const openNotify = (
  options: Omit<NotifyOptions, 'id' | 'duration' | 'alignment'> & {
    id?: string
    duration?: number
    alignment?: NotifyAlignment
  },
) => {
  const id = options.id || Math.random().toString(36).substring(2, 15)
  const duration = options.duration !== undefined ? options.duration : 3500
  const alignment = options.alignment || configObservable.get().alignment

  const newNotify = { ...options, id, duration, alignment }

  notifyObservable.set((prev) => {
    const updated = { ...prev }

    if (updated[alignment]) {
      if (groupTimers[alignment]) {
        clearTimeout(groupTimers[alignment])
        delete groupTimers[alignment]
      }

      const newMap = new Map(updated[alignment])
      newMap.set(id, newNotify)
      updated[alignment] = newMap
    } else {
      updated[alignment] = new Map([[id, newNotify]])
    }

    return updated
  })
}

export const closeNotify = (id: string) => {
  const { animationConfig } = configObservable.get()

  notifyObservable.set((prev) => {
    const updated = { ...prev }

    Object.keys(updated).forEach((alignment) => {
      if (updated[alignment].has(id)) {
        const newMap = new Map(
          Array.from(updated[alignment]).filter(
            ([notifyId]) => notifyId !== id,
          ),
        )

        updated[alignment] = newMap

        if (newMap.size === 0) {
          groupTimers[alignment] = setTimeout(() => {
            notifyObservable.set((prev) => {
              const updated = { ...prev }
              delete updated[alignment]
              return updated
            })
            delete groupTimers[alignment]
          }, animationConfig.exit.duration + 1000)
        }
      }
    })

    return updated
  })
}

export const closeAll = () => {
  // Очистка всех таймеров перед сбросом состояния
  Object.keys(groupTimers).forEach((alignment) => {
    clearTimeout(groupTimers[alignment])
    delete groupTimers[alignment]
  })

  // Сброс состояния уведомлений
  notifyObservable.set(() => ({}))
}

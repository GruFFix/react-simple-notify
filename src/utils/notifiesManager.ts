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
  const config = configObservable.get()
  const id = options.id || Math.random().toString(36).substring(2, 15)
  const duration = options.duration !== undefined ? options.duration : 3500
  const alignment = options.alignment || config.alignment

  const newNotify = { ...options, id, duration, alignment }

  notifyObservable.set((prev) => {
    // Get fresh config inside the callback
    const currentConfig = configObservable.get()
    const updated = { ...prev }

    // Clear any existing timer for this alignment
    if (groupTimers[alignment]) {
      clearTimeout(groupTimers[alignment])
      delete groupTimers[alignment]
    }

    // Get existing map or create new one
    const existingMap = updated[alignment]
    const newMap = existingMap ? new Map(existingMap) : new Map()

    // Apply maxNotifications limit if set
    if (currentConfig.maxNotifications && currentConfig.maxNotifications > 0) {
      // Remove oldest notifications until we're under the limit
      while (newMap.size >= currentConfig.maxNotifications) {
        const firstKey = newMap.keys().next().value
        if (firstKey) {
          newMap.delete(firstKey)
        } else {
          break
        }
      }
    }

    // Add new notification
    newMap.set(id, newNotify)
    updated[alignment] = newMap

    return updated
  })

  return id
}

export const updateNotify = (
  id: string,
  options: Partial<Omit<NotifyOptions, 'id' | 'alignment'>>,
) => {
  notifyObservable.set((prev) => {
    const updated = { ...prev }

    for (const alignment in updated) {
      if (updated[alignment].has(id)) {
        const existingMap = updated[alignment]
        const existingNotify = existingMap.get(id)

        if (existingNotify) {
          const newMap = new Map(existingMap)
          newMap.set(id, { ...existingNotify, ...options })
          updated[alignment] = newMap
        }
        break
      }
    }

    return updated
  })

  return id
}

export const closeNotify = (id: string) => {
  const { animationConfig } = configObservable.get()

  notifyObservable.set((prev) => {
    const updated = { ...prev }

    for (const alignment in updated) {
      if (updated[alignment].has(id)) {
        const existingMap = updated[alignment]
        const newMap = new Map(existingMap)
        newMap.delete(id)

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
        break
      }
    }

    return updated
  })
}

export const closeAll = () => {
  for (const alignment in groupTimers) {
    clearTimeout(groupTimers[alignment])
    delete groupTimers[alignment]
  }

  notifyObservable.set(() => ({}))
}

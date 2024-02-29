import { useCallback, useEffect, useMemo, useState } from 'react'

import { GroupedNotify, NotifyAlignment, NotifyOptions } from "../types.ts";


const generateUUID = () => Math.random().toString(36).substring(2, 5)

export const useNotifyManager = () => {
  const [notifications, setNotifications] = useState<NotifyOptions[]>([])
  const [containers, setContainers] = useState<NotifyAlignment[]>([])

  const notifyGrouped = useMemo<GroupedNotify>(
    () =>
      notifications.reduce((acc, notification) => {
        const { alignment } = notification

        acc[alignment] = acc[alignment] || []
        acc[alignment].push(notification)

        if (!containers.includes(alignment)) {
          setContainers((prevContainers) => [...prevContainers, alignment])
        }

        return acc
      }, {} as GroupedNotify),
    [containers, notifications],
  )

  const openNotify = useCallback(
    (options: Omit<NotifyOptions, 'id'> & { id?: string }) => {
      const id = options.id || generateUUID()

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { ...options, id },
      ])
    },
    [],
  )

  const closeNotify = useCallback((id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id),
    )
  }, [])

  const closeAllNotify = useCallback(() => {
    const alignmentKeys: NotifyAlignment[] = Object.keys(
      notifyGrouped,
    ) as NotifyAlignment[]
    const closePromises: Promise<void>[] = []

    alignmentKeys.forEach((alignment) => {
      const alignmentNotifications = notifyGrouped[alignment]
      let delay = 0

      alignmentNotifications.forEach((notify) => {
        closePromises.push(
          new Promise<void>((resolve) => {
            setTimeout(() => {
              closeNotify(notify.id)
              resolve()
            }, delay)
          }),
        )
        delay += 100
      })
    })

    Promise.all(closePromises).then(() => {
      console.log('all close')
    })
  }, [closeNotify, notifyGrouped])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainers((prevContainers) => {
        return prevContainers.filter((alignment) =>
          notifications.some(
            (notification) => notification.alignment === alignment,
          ),
        )
      })
    }, 1500)

    return () => clearTimeout(timeout)
  }, [notifications])

  return {
    notifyGrouped,
    openNotify,
    closeNotify,
    closeAllNotify,
    containers,
  }
}

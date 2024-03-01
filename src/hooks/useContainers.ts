import { useEffect, useMemo, useState } from 'react'
import { GroupedNotify, NotifyAlignment } from '../types'
import { useNotifyStore } from './useNotifyStore'

export const useContainers = () => {
  const { notify } = useNotifyStore(['notify'])

  const [containers, setContainers] = useState<NotifyAlignment[]>([])

  const notifyGrouped = useMemo<GroupedNotify>(
    () =>
      notify.get().reduce((acc, notification) => {
        const { alignment } = notification

        acc[alignment] = acc[alignment] || []
        acc[alignment].push(notification)

        if (!containers.includes(alignment)) {
          setContainers((prevContainers) => [...prevContainers, alignment])
        }

        return acc
      }, {} as GroupedNotify),
    [containers, notify.get()],
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainers((prevContainers) => {
        return prevContainers.filter((alignment) =>
          notify
            .get()
            .some((notification) => notification.alignment === alignment),
        )
      })
    }, 150)

    return () => clearTimeout(timeout)
  }, [notify.get()])

  return {
    notifyGrouped,
    containers,
  }
}

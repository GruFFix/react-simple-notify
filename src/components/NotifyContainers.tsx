import { FC, memo, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { NotifyContainer } from './NotifyContainer.tsx'
import { Notify } from './Notify.tsx'

import { NotifyAlignment, NotifyOptions } from '../types.ts'
import { notifyObservable } from '../utils/notifiesManager.ts'

interface NotifyContainerProps {
  notifyGroup: Map<string, NotifyOptions>
  alignment: NotifyAlignment
  dataTestId?: string
}

const areEqual = (
  prevProps: NotifyContainerProps,
  nextProps: NotifyContainerProps,
) => {
  if (prevProps.alignment !== nextProps.alignment) return false
  if (prevProps.notifyGroup.size !== nextProps.notifyGroup.size) return false

  // Check if the actual notification IDs are the same
  const prevIds = Array.from(prevProps.notifyGroup.keys())
  const nextIds = Array.from(nextProps.notifyGroup.keys())

  if (prevIds.length !== nextIds.length) return false

  for (let i = 0; i < prevIds.length; i++) {
    if (prevIds[i] !== nextIds[i]) return false

    // Check if notification data has changed
    const prevNotify = prevProps.notifyGroup.get(prevIds[i])
    const nextNotify = nextProps.notifyGroup.get(nextIds[i])

    // If data or render function changed, need to re-render
    if (prevNotify?.data !== nextNotify?.data) return false
    if (prevNotify?.render !== nextNotify?.render) return false
  }

  return true
}

const NotifyContainerComponent: FC<NotifyContainerProps> = memo(
  ({ notifyGroup, alignment, dataTestId }) => {
    const notifies = []
    for (const notify of notifyGroup.values()) {
      notifies.push(<Notify key={notify.id} {...notify} />)
    }

    return (
      <NotifyContainer alignment={alignment} dataTestId={dataTestId}>
        {notifies}
      </NotifyContainer>
    )
  },
  areEqual,
)

const useRerender = () => {
  const [, setState] = useState({})
  return useCallback(() => setState({}), [])
}

interface NotifyContainersProps {
  dataTestId?: string
}

export const NotifyContainers: FC<NotifyContainersProps> = memo(
  ({ dataTestId }) => {
    const rerender = useRerender()

    useEffect(() => {
      const unsubscribe = notifyObservable.subscribe(() => {
        rerender()
      })

      return () => {
        unsubscribe()
      }
    }, [rerender])

    if (typeof document === 'undefined') {
      return null
    }

    return Object.entries(notifyObservable.get()).map(
      ([alignment, notifications]) =>
        createPortal(
          <NotifyContainerComponent
            alignment={alignment as NotifyAlignment}
            key={alignment}
            notifyGroup={notifications}
            dataTestId={dataTestId}
          />,
          document.body,
          alignment,
        ),
    )
  },
)

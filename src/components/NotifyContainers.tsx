import { FC, memo, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { NotifyContainer } from './NotifyContainer.tsx'
import { Notify } from './Notify.tsx'

import { NotifyAlignment, NotifyOptions } from '../types.ts'
import { notifyObservable } from '../utils/notifiesManager.ts'

interface NotifyContainerProps {
  notifyGroup: NotifyOptions[]
  alignment: NotifyAlignment
}

const areEqual = (
  prevProps: NotifyContainerProps,
  nextProps: NotifyContainerProps,
) => {
  return (
    prevProps.alignment === nextProps.alignment &&
    prevProps.notifyGroup.length === nextProps.notifyGroup.length
  )
}

const NotifyContainerComponent: FC<NotifyContainerProps> = memo(
  ({ notifyGroup, alignment }) => (
    <NotifyContainer alignment={alignment}>
      {notifyGroup.map((notify) => (
        <Notify key={notify.id} {...notify} />
      ))}
    </NotifyContainer>
  ),
  areEqual,
)

const useRerender = () => {
  const [, setState] = useState({})
  return useCallback(() => setState({}), [])
}

export const NotifyContainers: FC = memo(() => {
  const rerender = useRerender()

  useEffect(() => {
    const unsubscribe = notifyObservable.subscribe(() => {
      rerender()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return Object.entries(notifyObservable.get()).map(
    ([alignment, notifications]) =>
      createPortal(
        <NotifyContainerComponent
          alignment={alignment as NotifyAlignment}
          key={alignment}
          notifyGroup={notifications}
        />,
        document.body,
        alignment,
      ),
  )
})

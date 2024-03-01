import { createPortal } from 'react-dom'

import { NotifyContainer } from './NotifyContainer.tsx'
import { Notify } from './Notify.tsx'

import { useContainers } from '../hooks/useContainers.ts'

import { NotifyAlignment } from '../types.ts'
import '../styles.css'

export const NotifyContainers = () => {
  const { notifyGrouped, containers } = useContainers()

  return containers.map((alignment) =>
    createPortal(
      <NotifyContainer key={alignment} alignment={alignment as NotifyAlignment}>
        {notifyGrouped?.[alignment]?.map((notify) => (
          <Notify key={notify.id} {...notify} />
        ))}
      </NotifyContainer>,
      document.body,
    ),
  )
}

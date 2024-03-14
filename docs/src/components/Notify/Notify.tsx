import { FC, PropsWithChildren } from 'react'

import s from './Notify.module.scss'

interface NotifyProps {
  className?: string
}

export const Notify: FC<PropsWithChildren<NotifyProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={`${s.root} ${className}`}>
      <div className={s.content}>{children}</div>
    </div>
  )
}

import { FC, PropsWithChildren } from 'react'

import s from './Card.module.scss'

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}

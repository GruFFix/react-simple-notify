import { FC, PropsWithChildren } from 'react'

import s from './Text.module.scss'

export const Text: FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}

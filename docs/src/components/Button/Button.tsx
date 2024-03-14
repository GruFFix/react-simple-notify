import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react'

import s from './Button.module.scss'

export const Button: FC<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, ...rest }) => {
  return (
    <button type="button" {...rest} className={s.root}>
      {children}
    </button>
  )
}

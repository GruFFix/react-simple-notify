import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import { withStyles } from '@bruitt/classnames'

import s from './Button.module.scss'

let sx = withStyles(s)

interface ButtonProps
  extends PropsWithChildren<
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>
  > {
  isFullWidth?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  isFullWidth,
  ...props
}) => {
  return (
    <button {...props} type="button" className={sx(s.root, { isFullWidth })}>
      {children}
    </button>
  )
}

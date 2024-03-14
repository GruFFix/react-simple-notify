import s from './Welcome.module.scss'
import { Button } from '@/components/Button'
import { FC } from 'react'
import { HeaderNotify } from '@/components/HeaderNotify'
import { Notify } from '@/components/Notify'

interface WelcomeProps {
  onNextStep: () => void
}

export const Welcome: FC<WelcomeProps> = ({ onNextStep }) => {
  return (
    <Notify className={s.root}>
      <HeaderNotify />

      <div className={s.title}>Hello =)</div>
      <div className={s.description}>
        I`m versatile notification library for React applications, allowing for
        easy creation, configuration, and management of notifications.
      </div>

      <div className={s.content}>
        <div className={s.description}>Let me show you what I can do?</div>

        <Button onClick={onNextStep}>Go!</Button>
      </div>
    </Notify>
  )
}

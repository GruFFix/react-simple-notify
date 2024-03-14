import s from './Alignment.module.scss'
import { Button } from '@/components/Button'
import { FC } from 'react'
import { NotifyAlignment, notify } from 'react-simple-notify'
import { Notify } from '@/components/Notify'
import { HeaderNotify } from '@/components/HeaderNotify'

interface WelcomeProps {
  onNextStep: () => void
}

const config = [
  {
    id: NotifyAlignment.topLeft,
    alignment: NotifyAlignment.topLeft,
    duration: 0,
  },
  {
    id: NotifyAlignment.topCenter,
    alignment: NotifyAlignment.topCenter,
    duration: 0,
  },
  {
    id: NotifyAlignment.topRight,
    alignment: NotifyAlignment.topRight,
    duration: 0,
  },
  {
    id: NotifyAlignment.bottomLeft,
    alignment: NotifyAlignment.bottomLeft,
    duration: 0,
  },
  {
    id: NotifyAlignment.bottomCenter,
    alignment: NotifyAlignment.bottomCenter,
    duration: 0,
  },
  {
    id: NotifyAlignment.bottomRight,
    alignment: NotifyAlignment.bottomRight,
    duration: 0,
  },
]

export const Alignment: FC<WelcomeProps> = ({ onNextStep }) => {
  return (
    <Notify className={s.alignmentNotify}>
      <HeaderNotify />

      <div className={s.content}>
        <div className={s.title}>Alignment!</div>
        <div className={s.description}>
          I can be in different parts of the screen =)
        </div>
      </div>

      <div className={s.buttons}>
        {config.map((i) => (
          <Button
            key={i.id}
            onClick={() =>
              notify.open({
                ...i,
                render: () => (
                  <Notify className={s.alignmentNotifyExample}>{i.id}</Notify>
                ),
              })
            }
          >
            {i.id}
          </Button>
        ))}
      </div>

      <div className={s.nextButton}>
        <Button
          onClick={() => {
            config.forEach((i) => notify.close(i.id))
            onNextStep()
          }}
        >
          Next
        </Button>
      </div>
    </Notify>
  )
}

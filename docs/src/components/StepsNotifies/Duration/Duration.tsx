import s from './Duration.module.scss'
import { Button } from '@/components/Button'
import { FC, useEffect, useState } from 'react'
import { NotifyAlignment, notify, NotifyRenderArgs } from 'react-simple-notify'
import { Notify } from '@/components/Notify'
import { HeaderNotify } from '@/components/HeaderNotify'
import { IoCloseSharp } from 'react-icons/io5'

interface WelcomeProps {
  onNextStep: () => void
}

const config = [
  {
    id: '1500',
    alignment: NotifyAlignment.bottomCenter,
    duration: 1500,
  },
  {
    id: '2500',
    alignment: NotifyAlignment.bottomCenter,
    duration: 2500,
  },
  {
    id: '3500',
    alignment: NotifyAlignment.bottomCenter,
    duration: 3500,
  },
  {
    id: '4500',
    alignment: NotifyAlignment.bottomCenter,
    duration: 4500,
  },
  {
    id: 'nonClose',
    alignment: NotifyAlignment.bottomCenter,
    duration: 0,
  },
]

interface CountDownProps {
  duration: number
  onClose: () => void
}

const CountDown: FC<CountDownProps> = ({ duration, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10)
    }, 10)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const formatTime = () => {
    const seconds = Math.floor(timeLeft / 1000)
    const milliseconds = Math.floor((timeLeft % 1000) / 10) // Get the tens of milliseconds for display

    return `${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <Notify className={s.alignmentNotifyExample}>
      {timeLeft <= 0 ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          I won't close myself
          <Button style={{ display: 'flex' }} onClick={onClose}>
            <IoCloseSharp />
          </Button>
        </span>
      ) : (
        `I'll close in ${formatTime()}`
      )}{' '}
    </Notify>
  )
}

export const Duration: FC<WelcomeProps> = ({ onNextStep }) => {
  return (
    <Notify className={s.alignmentNotify}>
      <HeaderNotify />

      <div className={s.content}>
        <div className={s.title}>Duration!</div>
        <div className={s.description}>
          I can close notifications using a timer
        </div>
      </div>

      <div className={s.buttons}>
        {config.map((i) => (
          <Button
            key={i.id}
            onClick={() =>
              notify.open({
                ...i,
                render: ({ duration, onClose }: NotifyRenderArgs) => (
                  <CountDown onClose={onClose} duration={duration} />
                ),
              })
            }
          >
            {i.duration}
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

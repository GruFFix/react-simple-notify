import s from './Render.module.scss'
import { Button } from '@/components/Button'
import { FC, useEffect } from 'react'
import { NotifyAlignment, notify } from 'react-simple-notify'
import { Notify } from '@/components/Notify'
import { HeaderNotify } from '@/components/HeaderNotify'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cat from '../../../../cat.svg'

interface WelcomeProps {
  onNextStep: () => void
}

const config = [
  {
    id: 'audio',
    alignment: NotifyAlignment.bottomCenter,
    duration: 3000,
    render: () => (
      <figure>
        <audio controls src=""></audio>
      </figure>
    ),
  },
  {
    id: 'iframe',
    alignment: NotifyAlignment.bottomLeft,
    duration: 5000,
    render: () => (
      <div style={{ width: 400, top: -10, position: 'relative' }}>
        <iframe
          src="https://react.dev/"
          title="React"
          width="100%"
          height="400"
          style={{ border: 'none' }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        >
          error
        </iframe>
      </div>
    ),
  },
  {
    id: 'cat',
    alignment: NotifyAlignment.topRight,
    duration: 3000,
    render: () => (
      <Notify className={s.alignmentNotifyExample}>
        <img src={cat} width={30} />
      </Notify>
    ),
  },
]

export const Render: FC<WelcomeProps> = ({ onNextStep }) => {
  useEffect(() => {}, [])

  return (
    <Notify className={s.alignmentNotify}>
      <HeaderNotify />

      <div className={s.content}>
        <div className={s.title}>Render!</div>
        <div className={s.description}>Show everything you want!</div>
      </div>

      <div className={s.buttons}>
        {config.map((i) => (
          <Button
            key={i.id}
            onClick={() =>
              notify.open({
                ...i,
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

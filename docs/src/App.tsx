import { FC, useEffect, useState } from 'react'

import {
  notify,
  NotifyAlignment,
  NotifyContainers,
  animationConfig,
} from '../../src'

import { Welcome } from '@/components/StepsNotifies/Welcome/Welcome.tsx'
import { Alignment } from '@/components/StepsNotifies/Alignment/Alignment.tsx'
import { Duration } from '@/components/StepsNotifies/Duration'
import { Render } from '@/components/StepsNotifies/Render'

export const App: FC = () => {
  const [step, setStep] = useState(0)

  const nextStep = () => {
    setTimeout(() => {
      setStep((prev) => {
        return prev === 3 ? 0 : prev + 1
      })
    }, animationConfig.exit.duration)
  }

  useEffect(() => {
    if (step === 0) {
      notify.open({
        id: '0',
        alignment: NotifyAlignment.bottomCenter,
        duration: 0,
        render: ({ onClose }) => (
          <Welcome
            onNextStep={() => {
              onClose()
              nextStep()
            }}
          />
        ),
      })
    }

    if (step === 1) {
      notify.open({
        id: '1',
        alignment: NotifyAlignment.bottomCenter,
        duration: 0,
        render: ({ onClose }) => (
          <Alignment
            onNextStep={() => {
              onClose()
              nextStep()
            }}
          />
        ),
      })
    }

    if (step === 2) {
      notify.open({
        id: '2',
        alignment: NotifyAlignment.bottomCenter,
        duration: 0,
        render: ({ onClose }) => (
          <Duration
            onNextStep={() => {
              onClose()
              nextStep()
            }}
          />
        ),
      })
    }

    if (step === 3) {
      notify.open({
        id: '3',
        alignment: NotifyAlignment.bottomCenter,
        duration: 0,
        render: ({ onClose }) => (
          <Render
            onNextStep={() => {
              onClose()
              nextStep()
            }}
          />
        ),
      })
    }
  }, [step])

  return <NotifyContainers />
}

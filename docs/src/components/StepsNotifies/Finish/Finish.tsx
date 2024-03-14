import s from './Finish.module.scss'
import { Button } from '@/components/Button'
import { FC, useEffect } from 'react'
import { Notify } from '@/components/Notify'
import { HeaderNotify } from '@/components/HeaderNotify'
import { Icon } from '@chakra-ui/react'
import { FaGithub, FaNpm } from 'react-icons/fa'

interface WelcomeProps {
  onNextStep: () => void
}

export const Finish: FC<WelcomeProps> = () => {
  useEffect(() => {}, [])

  return (
    <Notify className={s.alignmentNotify}>
      <HeaderNotify />

      <div className={s.content}>
        <div className={s.title}>Contacts!</div>
        <div className={s.description}>
          Documentation or download the library using the links below.!
        </div>
      </div>

      <div className={s.nextButton}>
        <Button
          onClick={() => {
            window.open(
              'https://github.com/GruFFix/react-simple-notify',
              '_blank',
            )
          }}
        >
          <Icon as={FaGithub} />
        </Button>

        <Button
          onClick={() => {
            window.open(
              'https://www.npmjs.com/package/react-simple-notify',
              '_blank',
            )
          }}
        >
          <Icon as={FaNpm} />
        </Button>
      </div>
    </Notify>
  )
}

import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Code } from '@/components/Code/Code.tsx'

import s from './Animation.module.scss'

import { useAnimation } from '@/hooks/useAnimation.tsx'
import { FC } from 'react'

interface AnimationProps {
  onLick: (type: string) => void
}

export const Animation: FC<AnimationProps> = ({ onLick }) => {
  const { templateString, types } = useAnimation()

  return (
    <div>
      <h2>Animation</h2>

      <Card>
        <div className={s.buttons}>
          {types.map((types, index) => {
            return (
              <Button isFullWidth key={index} onClick={() => onClick(types)}>
                {types.name}
              </Button>
            )
          })}
        </div>

        <Code code={templateString} />
      </Card>
    </div>
  )
}

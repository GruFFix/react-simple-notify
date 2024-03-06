import { Icon, Button } from '@chakra-ui/react'
import { TbArrowsRandom } from 'react-icons/tb'

import { useNotify, NotifyAlignment } from '../../../src'
import { ColorsNotify } from '@/NotifyVariants/ColorsNotify.tsx'
import { SimpleNotify } from '@/NotifyVariants/SimpleNotify.tsx'
import { CloseNotify } from '@/NotifyVariants/CloseNotify.tsx'
import { StatusNotify } from '@/NotifyVariants/StatusNotify.tsx'
import { DarkNotify } from '@/NotifyVariants/DarkNotify.tsx'
import { LoadingNotify } from '@/NotifyVariants/LoadingNotify.tsx'

const NotifyComponents = [
  ColorsNotify,
  SimpleNotify,
  CloseNotify,
  StatusNotify,
  DarkNotify,
  LoadingNotify,
]

export const RandomNotify = () => {
  const { notify } = useNotify()

  const handleOpen = () => {
    const alignments = Object.values(NotifyAlignment)
    const randomIndex = Math.floor(Math.random() * alignments.length)
    const randomAlignment = alignments[randomIndex]

    const randomComponentIndex = Math.floor(
      Math.random() * NotifyComponents.length,
    )
    const RandomComponent = NotifyComponents[randomComponentIndex]

    notify.open({
      alignment: randomAlignment,
      duration: Math.floor(Math.random() * 5000) + 1000,
      render: RandomComponent,
    })
  }

  return (
    <Button
      colorScheme="purple"
      onClick={handleOpen}
      width="auto"
      size="lg"
      rightIcon={<Icon as={TbArrowsRandom} />}
    >
      Random Notify
    </Button>
  )
}

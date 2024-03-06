import { FC } from 'react'

import { NotifyRenderArgs } from 'react-simple-notify'

import { CardBody, Card, Text } from '@chakra-ui/react'

export const BaseNotify: FC<NotifyRenderArgs> = ({ onClose }) => {
  console.log('onClose - ', onClose)
  return (
    <Card>
      <CardBody padding={2}>
        <Text>Hello, i am Notify 👋</Text>
      </CardBody>
    </Card>
  )
}

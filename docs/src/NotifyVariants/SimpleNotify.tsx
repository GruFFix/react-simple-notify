import { FC } from 'react'

import { CardBody, Card, Text } from '@chakra-ui/react'

export const SimpleNotify: FC = () => {
  return (
    <Card>
      <CardBody padding={2}>
        <Text>Hello, i am Notify 👋</Text>
      </CardBody>
    </Card>
  )
}

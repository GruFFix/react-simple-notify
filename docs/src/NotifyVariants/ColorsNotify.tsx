import { FC } from 'react'

import { CardBody, Card, Text } from '@chakra-ui/react'

export const ColorsNotify: FC = () => {
  const colors = ['orange.300', 'green.300', 'blue.300', 'red.300']
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]

  return (
    <Card bg={randomColor}>
      <CardBody padding={3}>
        <Text color="white">I am random color Notify</Text>
      </CardBody>
    </Card>
  )
}

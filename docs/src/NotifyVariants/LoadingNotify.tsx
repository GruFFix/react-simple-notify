import { FC } from 'react'

import { CardBody, Card, Text, Spinner } from '@chakra-ui/react'

export const LoadingNotify: FC = () => {
  return (
    <Card borderRadius="40" variant="filled" bg="#91b6dc" padding={3}>
      <CardBody padding={0} display="flex" alignItems="center" gap={2}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="md"
        />

        <Text fontWeight={500} color="white">
          Waaaaaait.....
        </Text>
      </CardBody>
    </Card>
  )
}

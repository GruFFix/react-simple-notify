import { FC } from 'react'

import { CardBody, Card, Text } from '@chakra-ui/react'
import { Cat } from '@/components/Cat'

export const DarkNotify: FC = () => {
  return (
    <Card borderRadius="40" variant="filled" bg="#505050" padding={3}>
      <CardBody padding={0} display="flex" alignItems="center" gap={2}>
        <div style={{ transform: 'scale(.3)', margin: -18 }}>
          <Cat />
        </div>

        <Text color="white">Booo!</Text>
      </CardBody>
    </Card>
  )
}

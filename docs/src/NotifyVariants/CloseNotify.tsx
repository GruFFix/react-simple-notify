import { FC } from 'react'
import { NotifyRenderArgs } from '../../../src'

import { CardBody, Card, Text, CloseButton } from '@chakra-ui/react'

export const CloseNotify: FC<NotifyRenderArgs> = ({ onClose }) => {
  return (
    <Card direction="row" alignItems="center">
      <CardBody padding={3}>
        <Text>You can close me</Text>
      </CardBody>

      <CloseButton size="md" onClick={onClose} />
    </Card>
  )
}

import { FC } from 'react'

import { IoWarningOutline } from 'react-icons/io5'
import { IoMdDoneAll } from 'react-icons/io'
import { MdOutlineErrorOutline } from 'react-icons/md'

import { NotifyRenderArgs } from 'react-simple-notify'

import { CardBody, Card, Text, Heading, Flex, Icon } from '@chakra-ui/react'

const types = [
  {
    color: 'green',
    title: 'Success',
    icon: IoMdDoneAll,
  },
  {
    color: 'orange',
    title: 'Warning',
    icon: IoWarningOutline,
  },
  {
    color: 'red',
    title: 'Error',
    icon: MdOutlineErrorOutline,
  },
]

export const StatusNotify: FC<NotifyRenderArgs> = ({ onClose }) => {
  const randomComponentIndex = Math.floor(Math.random() * types.length)
  const randomType = types[randomComponentIndex]

  return (
    <Card
      width={400}
      bg={`${randomType.color}.100`}
      borderColor={`${randomType.color}`}
      onClick={onClose}
    >
      <CardBody padding={3}>
        <Flex direction="column" gap={2}>
          <Heading
            display="flex"
            alignItems="center"
            as="h4"
            gap={2}
            size="14"
            color={randomType.color}
          >
            <Icon as={randomType.icon} />
            {randomType.title}
          </Heading>

          <Text fontSize={14}>
            Lorem Ipsum is simply dummy text of the printing and type...
          </Text>
        </Flex>
      </CardBody>
    </Card>
  )
}

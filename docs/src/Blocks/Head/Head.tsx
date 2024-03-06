import { Heading, Center } from '@chakra-ui/react'

import { Container, Text, Flex, Divider, Button, Icon } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cat from '../../../cat.svg'

import { RandomNotify } from '@/RandomNotify/RandomNotify.tsx'
import { FaGithub, FaNpm } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'

export const Head = () => {
  return (
    <Container>
      <Center height="100vh" flexDirection="column">
        <Flex direction="column" gap={4} marginBottom={10}>
          <Heading
            textShadow="1px 1px 0px #7f4be7"
            fontWeight={800}
            textAlign="center"
            size="2xl"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <img src={cat} alt="React Simple Notify" width={60} />
            React Simple Notify
          </Heading>

          <Divider borderColor="#c6aafd" />

          <Text
            textAlign="center"
            fontSize={19}
            fontWeight={500}
            color="#727171"
          >
            lightweight and easy-to-use notification library for React
            applications. It allows developers to effortlessly integrate
            customizable notifications into their web projects.
          </Text>
        </Flex>

        <RandomNotify />

        <Flex justifyContent="center" gap={2} marginTop={10}>
          <Button
            leftIcon={<Icon as={FaGithub} />}
            variant="link"
            colorScheme="purple"
          >
            Github
          </Button>

          <Divider orientation="vertical" borderColor="#c6aafd" />

          <Button
            leftIcon={<Icon as={FaNpm} />}
            variant="link"
            colorScheme="purple"
          >
            Npm
          </Button>

          <Divider orientation="vertical" borderColor="#c6aafd" />

          <Button
            leftIcon={<Icon as={IoDocumentTextOutline} />}
            variant="link"
            colorScheme="purple"
          >
            Docs
          </Button>
        </Flex>
      </Center>
    </Container>
  )
}

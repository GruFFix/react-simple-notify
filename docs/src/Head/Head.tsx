import { Heading, Center } from '@chakra-ui/react'

import { Container, Text, Flex, Divider, Button, Icon } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cat from '../../cat.svg'

import { RandomNotify } from '@/RandomNotify/RandomNotify.tsx'
import { FaGithub, FaNpm } from 'react-icons/fa'

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
            A versatile notification library for React applications, allowing
            for easy creation, configuration, and management of notifications.
          </Text>
        </Flex>

        <RandomNotify />

        <Flex justifyContent="center" gap={2} marginTop={10}>
          <Button
            onClick={() =>
              window.open(
                'https://github.com/GruFFix/react-simple-notify',
                '_blank',
              )
            }
            leftIcon={<Icon as={FaGithub} />}
            variant="link"
            colorScheme="purple"
          >
            Github
          </Button>

          <Divider orientation="vertical" borderColor="#c6aafd" />

          <Button
            onClick={() =>
              window.open(
                'https://www.npmjs.com/package/react-simple-notify',
                '_blank',
              )
            }
            leftIcon={<Icon as={FaNpm} />}
            variant="link"
            colorScheme="purple"
          >
            Npm
          </Button>
        </Flex>
      </Center>
    </Container>
  )
}

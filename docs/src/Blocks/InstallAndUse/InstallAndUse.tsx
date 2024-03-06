import { Code } from '@/components/Code/Code.tsx'
import { Container, Card, Flex, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import Prism from 'prismjs'

const install = `npm install react-simple-notify
# or
yarn add react-simple-notify`

const usage = `import React from 'react';
import { useNotify, NotifyContainers } from "react-simple-notify";

const App = () => {
  const { notify } = useNotify();

  const showNotification = () => {
    notify.open({
      duration: 3000,
      alignment: 'top-right',
      render: ({ onClose }) => (
        <div onClick={onClose}>
          This is a notification!
        </div>
      )
    });
  };

  return (
    <>
      <button onClick={showNotification}>Show Notification</button>
      <NotifyContainers />
    </>
  );
}
`

export const InstallAndUse = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Flex direction="column" gap={6}>
      <Container>
        <Heading as="h3" size="md">
          Install
        </Heading>
        <Card overflow="hidden" marginTop={2}>
          <Code language="bash" code={install} />
        </Card>
      </Container>

      <Container maxWidth="4xl">
        <Heading as="h3" size="md">
          Basic usage
        </Heading>
        <Card overflow="hidden" marginTop={2}>
          <Code language="js" code={usage} />
        </Card>
      </Container>
    </Flex>
  )
}

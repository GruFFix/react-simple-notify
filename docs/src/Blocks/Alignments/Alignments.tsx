import Prism from 'prismjs'
import { useEffect } from 'react'
import {
  CardBody,
  SimpleGrid,
  Card,
  Button,
  Heading,
  Flex,
} from '@chakra-ui/react'

import { useAlignments } from './useAlignments.tsx'
import { Code } from '@/components/Code/Code.tsx'

const codeTemplate = (alignment: string) => {
  return `import { useNotify } from "react-simple-notify"

const { notify } = useNotify();

notify.open({
  alignment: '${alignment}',
  duration: 1500,
  render: NotifyComponent
})`
}

export const Alignments = () => {
  const { types, onClick, selectedAlignment } = useAlignments()

  useEffect(() => {
    Prism.highlightAll()
  }, [selectedAlignment])

  return (
    <Flex direction="column" gap={2}>
      <Heading as="h3" size="md">
        Alignment:
      </Heading>

      <Card variant="outline" overflow="hidden">
        <CardBody>
          <SimpleGrid columns={3} spacing={2}>
            {types.map((type) => (
              <Button
                size="sm"
                key={type.alignment}
                onClick={() => onClick(type)}
              >
                {type.alignment}
              </Button>
            ))}
          </SimpleGrid>
        </CardBody>

        <Code code={codeTemplate(selectedAlignment)} />
      </Card>
    </Flex>
  )
}

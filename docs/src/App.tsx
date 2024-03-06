import { FC } from 'react'

import { NotifyContainers } from '../../src'

import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import { Head } from '@/Blocks/Head'

const theme = extendTheme({
  fonts: {
    heading: `"Montserrat", sans-serif`,
    body: `"Montserrat", sans-serif`,
  },
  styles: {
    global: {
      // Здесь вы можете указать любые глобальные CSS свойства
      body: {
        background: 'linear-gradient(to bottom right, #f1f5f9, #cfe1f2)',
        bg: '#f1f5f9', // Установка цвета фона для всего тела страницы
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: '#a87ffb',
      },
    },
  },
})

export const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Head />

        <NotifyContainers />
      </Box>
    </ChakraProvider>
  )
}

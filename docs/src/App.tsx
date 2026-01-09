import { FC } from 'react'
import { NotifyContainers } from 'react-simple-notify'

import { Hero } from '@/components/Hero'
import { Showcase } from '@/components/Showcase'
import { Footer } from '@/components/Footer'

export const App: FC = () => {
  return (
    <>
      <Hero />
      <Showcase />
      <Footer />
      <NotifyContainers />
    </>
  )
}

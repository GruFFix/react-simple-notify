import { useState } from 'react'

import { useNotify, NotifyAlignment } from '../../../../src'

import { BaseNotify } from '@/components/BaseNotify/BaseNotify.tsx'

const DURATION = 2500

export const useAlignments = () => {
  const { notify } = useNotify()

  const types = [
    {
      duration: DURATION,
      alignment: NotifyAlignment.topLeft,
      render: BaseNotify,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.topCenter,
      render: BaseNotify,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.topRight,
      render: BaseNotify,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.bottomLeft,
      render: BaseNotify,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.bottomCenter,
      render: BaseNotify,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.bottomRight,
      render: BaseNotify,
    },
  ]

  const [selectedAlignment, setSelectedAlignment] = useState(types[0].alignment)

  const onClick = (prop) => {
    notify.open(prop)

    setSelectedAlignment(prop.alignment)
  }

  return {
    selectedAlignment,
    types,
    onClick,
  }
}

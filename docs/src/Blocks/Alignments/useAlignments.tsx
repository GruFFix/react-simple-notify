import { useState } from 'react'

import { useNotify, NotifyAlignment } from 'react-simple-notify'

const DURATION = 2500

export const useAlignments = () => {
  const { notify } = useNotify()

  const types = [
    {
      duration: DURATION,
      alignment: NotifyAlignment.topLeft,
      render: () => <div>123</div>,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.topCenter,
      render: () => <div>123</div>,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.topRight,
      render: () => <div>123</div>,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.bottomLeft,
      render: () => <div>123</div>,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.bottomCenter,
      render: () => <div>123</div>,
    },
    {
      duration: DURATION,
      alignment: NotifyAlignment.bottomRight,
      render: () => <div>123</div>,
    },
  ]

  const [selectedAlignment, setSelectedAlignment] = useState(types[0].alignment)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
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

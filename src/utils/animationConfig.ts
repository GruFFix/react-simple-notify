import { AnimationConfig, NotifyAlignment } from '../types.ts'

export const animationConfig: AnimationConfig = {
  enter: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    keyframes: ({ alignment }) => {
      let keyframes = []
      let transformValue = ''
      let startPosition = ''

      switch (alignment) {
        case NotifyAlignment.topLeft:
        case NotifyAlignment.bottomLeft:
          transformValue = 'translateX'
          startPosition = '-100%'
          break
        case NotifyAlignment.bottomCenter:
          transformValue = 'translateY'
          startPosition = '100%'
          break
        case NotifyAlignment.topCenter:
          transformValue = 'translateY'
          startPosition = '-100%'
          break
        default:
          transformValue = 'translateX'
          startPosition = '100%'
          break
      }

      keyframes = [
        { transform: `${transformValue}(${startPosition})`, opacity: 0 },
        { transform: `${transformValue}(0)`, opacity: 1 },
      ]

      return keyframes
    },
  },
  exit: {
    duration: 100,
    easing: 'linear',
    keyframes: ({ node }) => {
      if ('style' in node) {
        node.style.transformOrigin = 'center'
        node.style.overflow = 'hidden'
      }

      return [{ height: `${node.scrollHeight}px` }, { height: 0 }]
    },
  },
}

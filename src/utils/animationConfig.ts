import { AnimationConfig, NotifyAlignment } from '../types.ts'

interface EnterTransform {
  translateX: string
  translateY: string
  scale: string
}

const ENTER_TRANSFORMS: Record<NotifyAlignment, EnterTransform> = {
  [NotifyAlignment.topLeft]: {
    translateX: '-20px',
    translateY: '-20px',
    scale: '0.95',
  },
  [NotifyAlignment.topCenter]: {
    translateX: '0',
    translateY: '-20px',
    scale: '0.95',
  },
  [NotifyAlignment.topRight]: {
    translateX: '20px',
    translateY: '-20px',
    scale: '0.95',
  },
  [NotifyAlignment.bottomLeft]: {
    translateX: '-20px',
    translateY: '20px',
    scale: '0.95',
  },
  [NotifyAlignment.bottomCenter]: {
    translateX: '0',
    translateY: '20px',
    scale: '0.95',
  },
  [NotifyAlignment.bottomRight]: {
    translateX: '20px',
    translateY: '20px',
    scale: '0.95',
  },
}

export const animationConfig: AnimationConfig = {
  enter: {
    duration: 400,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    keyframes: ({ alignment }) => {
      const config = ENTER_TRANSFORMS[alignment]

      if (!config) {
        // fail-fast, чтобы новый enum не сломал UX молча
        throw new Error(`Unsupported NotifyAlignment: ${alignment}`)
      }

      return [
        {
          transform: `translate(${config.translateX}, ${config.translateY}) scale(${config.scale})`,
          opacity: 0,
        },
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1,
        },
      ]
    },
  },

  exit: {
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: ({ node }) => {
      const height = node.getBoundingClientRect().height
      const gap = 10 // default gap from CSS custom property

      return [
        {
          maxHeight: `${height}px`,
          marginBottom: `${gap}px`,
          transform: 'scale(1) translateX(0)',
          opacity: 1,
        },
        {
          maxHeight: '0px',
          marginBottom: '0px',
          transform: 'scale(0.9) translateX(20px)',
          opacity: 0,
        },
      ]
    },
  },
}

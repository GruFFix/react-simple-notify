import { describe, it, expect, beforeEach } from 'vitest'
import { configObservable, setConfig, resetConfig } from '../../utils/configManager'
import { NotifyAlignment } from '../../types'
import { Fragment } from 'react'

describe('configManager', () => {
  beforeEach(() => {
    resetConfig()
  })

  describe('configObservable', () => {
    it('should have default configuration', () => {
      const config = configObservable.get()

      expect(config.alignment).toBe(NotifyAlignment.bottomLeft)
      expect(config.notifyComponent).toBe(Fragment)
      expect(config.reverse).toBe(false)
      expect(config.animationConfig).toBeDefined()
    })

    it('should have animation config with enter and exit properties', () => {
      const config = configObservable.get()

      expect(config.animationConfig.enter).toBeDefined()
      expect(config.animationConfig.exit).toBeDefined()
      expect(config.animationConfig.enter.duration).toBeDefined()
      expect(config.animationConfig.exit.duration).toBeDefined()
    })
  })

  describe('setConfig', () => {
    it('should update alignment', () => {
      setConfig({ alignment: NotifyAlignment.topRight })

      const config = configObservable.get()
      expect(config.alignment).toBe(NotifyAlignment.topRight)
    })

    it('should update reverse', () => {
      setConfig({ reverse: true })

      const config = configObservable.get()
      expect(config.reverse).toBe(true)
    })

    it('should update multiple properties at once', () => {
      setConfig({
        alignment: NotifyAlignment.topCenter,
        reverse: true
      })

      const config = configObservable.get()
      expect(config.alignment).toBe(NotifyAlignment.topCenter)
      expect(config.reverse).toBe(true)
    })

    it('should preserve other properties when updating partial config', () => {
      const initialConfig = configObservable.get()

      setConfig({ alignment: NotifyAlignment.topRight })

      const updatedConfig = configObservable.get()
      expect(updatedConfig.alignment).toBe(NotifyAlignment.topRight)
      expect(updatedConfig.reverse).toBe(initialConfig.reverse)
      expect(updatedConfig.notifyComponent).toBe(initialConfig.notifyComponent)
    })

    it('should update animation config', () => {
      const customAnimationConfig = {
        enter: {
          duration: 500,
          easing: 'ease-in',
          keyframes: () => []
        },
        exit: {
          duration: 200,
          easing: 'ease-out',
          keyframes: () => []
        }
      }

      setConfig({ animationConfig: customAnimationConfig })

      const config = configObservable.get()
      expect(config.animationConfig.enter.duration).toBe(500)
      expect(config.animationConfig.exit.duration).toBe(200)
    })

    it('should accept custom notify component', () => {
      const CustomComponent = () => null

      setConfig({ notifyComponent: CustomComponent })

      const config = configObservable.get()
      expect(config.notifyComponent).toBe(CustomComponent)
    })
  })

  describe('resetConfig', () => {
    it('should reset to default configuration', () => {
      setConfig({
        alignment: NotifyAlignment.topRight,
        reverse: true
      })

      resetConfig()

      const config = configObservable.get()
      expect(config.alignment).toBe(NotifyAlignment.bottomLeft)
      expect(config.reverse).toBe(false)
    })

    it('should reset all properties', () => {
      const CustomComponent = () => null
      const customAnimationConfig = {
        enter: {
          duration: 500,
          easing: 'ease-in',
          keyframes: () => []
        },
        exit: {
          duration: 200,
          easing: 'ease-out',
          keyframes: () => []
        }
      }

      setConfig({
        alignment: NotifyAlignment.topRight,
        reverse: true,
        notifyComponent: CustomComponent,
        animationConfig: customAnimationConfig
      })

      resetConfig()

      const config = configObservable.get()
      expect(config.alignment).toBe(NotifyAlignment.bottomLeft)
      expect(config.reverse).toBe(false)
      expect(config.notifyComponent).toBe(Fragment)
      expect(config.animationConfig.enter.duration).toBe(300)
    })
  })

  describe('reactive updates', () => {
    it('should notify subscribers when config changes', () => {
      let notificationCount = 0

      configObservable.subscribe(() => {
        notificationCount++
      })

      setConfig({ alignment: NotifyAlignment.topRight })

      expect(notificationCount).toBe(1)
    })

    it('should notify subscribers on reset', () => {
      let notificationCount = 0

      configObservable.subscribe(() => {
        notificationCount++
      })

      resetConfig()

      expect(notificationCount).toBe(1)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { animationConfig } from '../../utils/animationConfig'
import { NotifyAlignment } from '../../types'

describe('animationConfig', () => {
  describe('structure', () => {
    it('should have enter and exit configurations', () => {
      expect(animationConfig.enter).toBeDefined()
      expect(animationConfig.exit).toBeDefined()
    })

    it('should have duration, easing and keyframes for enter', () => {
      expect(animationConfig.enter.duration).toBe(300)
      expect(animationConfig.enter.easing).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)')
      expect(typeof animationConfig.enter.keyframes).toBe('function')
    })

    it('should have duration, easing and keyframes for exit', () => {
      expect(animationConfig.exit.duration).toBe(150)
      expect(animationConfig.exit.easing).toBe('linear')
      expect(typeof animationConfig.exit.keyframes).toBe('function')
    })
  })

  describe('enter keyframes', () => {
    it('should return keyframes for topLeft alignment', () => {
      const mockNode = document.createElement('div')
      const keyframes = animationConfig.enter.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topLeft
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        transform: 'translateX(-100%)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translateX(0)',
        opacity: 1
      })
    })

    it('should return keyframes for topRight alignment', () => {
      const mockNode = document.createElement('div')
      const keyframes = animationConfig.enter.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topRight
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        transform: 'translateX(100%)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translateX(0)',
        opacity: 1
      })
    })

    it('should return keyframes for bottomLeft alignment', () => {
      const mockNode = document.createElement('div')
      const keyframes = animationConfig.enter.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.bottomLeft
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        transform: 'translateX(-100%)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translateX(0)',
        opacity: 1
      })
    })

    it('should return keyframes for bottomRight alignment', () => {
      const mockNode = document.createElement('div')
      const keyframes = animationConfig.enter.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.bottomRight
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        transform: 'translateX(100%)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translateX(0)',
        opacity: 1
      })
    })

    it('should return keyframes for topCenter alignment', () => {
      const mockNode = document.createElement('div')
      const keyframes = animationConfig.enter.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topCenter
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        transform: 'translateY(-100%)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translateY(0)',
        opacity: 1
      })
    })

    it('should return keyframes for bottomCenter alignment', () => {
      const mockNode = document.createElement('div')
      const keyframes = animationConfig.enter.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.bottomCenter
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        transform: 'translateY(100%)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translateY(0)',
        opacity: 1
      })
    })
  })

  describe('exit keyframes', () => {
    it('should return collapse keyframes', () => {
      const mockNode = document.createElement('div')
      Object.defineProperty(mockNode, 'scrollHeight', {
        value: 100,
        configurable: true
      })

      const keyframes = animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topLeft
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        height: '100px',
        opacity: 1
      })
      expect(keyframes[1]).toEqual({
        height: 0,
        opacity: 0
      })
    })

    it('should set transform origin and overflow on node', () => {
      const mockNode = document.createElement('div')

      animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topLeft
      })

      expect(mockNode.style.transformOrigin).toBe('center')
      expect(mockNode.style.overflow).toBe('hidden')
    })

    it('should handle different node heights', () => {
      const mockNode = document.createElement('div')
      Object.defineProperty(mockNode, 'scrollHeight', {
        value: 250,
        configurable: true
      })

      const keyframes = animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.bottomRight
      })

      expect(keyframes[0]).toEqual({
        height: '250px',
        opacity: 1
      })
    })

    it('should work with zero height', () => {
      const mockNode = document.createElement('div')
      Object.defineProperty(mockNode, 'scrollHeight', {
        value: 0,
        configurable: true
      })

      const keyframes = animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.bottomRight
      })

      expect(keyframes[0]).toEqual({
        height: '0px',
        opacity: 1
      })
    })
  })
})

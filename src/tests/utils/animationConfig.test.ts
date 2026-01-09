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
      expect(animationConfig.enter.duration).toBe(400)
      expect(animationConfig.enter.easing).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)')
      expect(typeof animationConfig.enter.keyframes).toBe('function')
    })

    it('should have duration, easing and keyframes for exit', () => {
      expect(animationConfig.exit.duration).toBe(250)
      expect(animationConfig.exit.easing).toBe('cubic-bezier(0.4, 0, 1, 1)')
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
        transform: 'translate(-20px, -20px) scale(0.95)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translate(0, 0) scale(1)',
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
        transform: 'translate(20px, -20px) scale(0.95)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translate(0, 0) scale(1)',
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
        transform: 'translate(-20px, 20px) scale(0.95)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translate(0, 0) scale(1)',
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
        transform: 'translate(20px, 20px) scale(0.95)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translate(0, 0) scale(1)',
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
        transform: 'translate(0, -20px) scale(0.95)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translate(0, 0) scale(1)',
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
        transform: 'translate(0, 20px) scale(0.95)',
        opacity: 0
      })
      expect(keyframes[1]).toEqual({
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      })
    })
  })

  describe('exit keyframes', () => {
    it('should return maxHeight and scale transform keyframes', () => {
      const mockNode = document.createElement('div')
      mockNode.getBoundingClientRect = () => ({ height: 100 }) as DOMRect

      const keyframes = animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topLeft
      })

      expect(keyframes).toHaveLength(2)
      expect(keyframes[0]).toEqual({
        maxHeight: '100px',
        marginBottom: '10px',
        transform: 'scale(1) translateX(0)',
        opacity: 1
      })
      expect(keyframes[1]).toEqual({
        maxHeight: '0px',
        marginBottom: '0px',
        transform: 'scale(0.9) translateX(20px)',
        opacity: 0
      })
    })

    it('should use node height for maxHeight calculation', () => {
      const mockNode = document.createElement('div')
      mockNode.getBoundingClientRect = () => ({ height: 150 }) as DOMRect

      const keyframes = animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.topLeft
      })

      expect(keyframes[0].maxHeight).toBe('150px')
    })

    it('should work consistently across alignments', () => {
      const mockNode = document.createElement('div')
      mockNode.getBoundingClientRect = () => ({ height: 100 }) as DOMRect

      const keyframes = animationConfig.exit.keyframes({
        node: mockNode,
        alignment: NotifyAlignment.bottomCenter
      })

      expect(keyframes[0]).toEqual({
        maxHeight: '100px',
        marginBottom: '10px',
        transform: 'scale(1) translateX(0)',
        opacity: 1
      })
      expect(keyframes[1]).toEqual({
        maxHeight: '0px',
        marginBottom: '0px',
        transform: 'scale(0.9) translateX(20px)',
        opacity: 0
      })
    })
  })
})

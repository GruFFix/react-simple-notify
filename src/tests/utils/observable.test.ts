import { describe, it, expect, vi } from 'vitest'
import { Observable } from '../../utils/observable'

describe('Observable', () => {
  describe('initialization', () => {
    it('should initialize with a value', () => {
      const observable = new Observable(42)
      expect(observable.get()).toBe(42)
    })

    it('should initialize with null', () => {
      const observable = new Observable(null)
      expect(observable.get()).toBeNull()
    })

    it('should initialize with an object', () => {
      const initialValue = { count: 0 }
      const observable = new Observable(initialValue)
      expect(observable.get()).toEqual(initialValue)
    })
  })

  describe('get', () => {
    it('should return the current value', () => {
      const observable = new Observable('test')
      expect(observable.get()).toBe('test')
    })
  })

  describe('set', () => {
    it('should set a new value', () => {
      const observable = new Observable(10)
      observable.set(20)
      expect(observable.get()).toBe(20)
    })

    it('should accept a function to update value', () => {
      const observable = new Observable(5)
      observable.set((prev) => prev + 10)
      expect(observable.get()).toBe(15)
    })

    it('should work with object updates', () => {
      const observable = new Observable({ count: 0, name: 'test' })
      observable.set((prev) => ({ ...prev, count: prev.count + 1 }))
      expect(observable.get()).toEqual({ count: 1, name: 'test' })
    })

    it('should notify listeners when value changes', () => {
      const observable = new Observable(0)
      const listener = vi.fn()

      observable.subscribe(listener)
      observable.set(1)

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should notify all listeners', () => {
      const observable = new Observable(0)
      const listener1 = vi.fn()
      const listener2 = vi.fn()
      const listener3 = vi.fn()

      observable.subscribe(listener1)
      observable.subscribe(listener2)
      observable.subscribe(listener3)

      observable.set(1)

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(1)
      expect(listener3).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribe', () => {
    it('should add a listener', () => {
      const observable = new Observable(0)
      const listener = vi.fn()

      observable.subscribe(listener)
      observable.set(1)

      expect(listener).toHaveBeenCalled()
    })

    it('should return an unsubscribe function', () => {
      const observable = new Observable(0)
      const listener = vi.fn()

      const unsubscribe = observable.subscribe(listener)

      expect(typeof unsubscribe).toBe('function')
    })

    it('should stop notifying after unsubscribe', () => {
      const observable = new Observable(0)
      const listener = vi.fn()

      const unsubscribe = observable.subscribe(listener)
      observable.set(1)

      expect(listener).toHaveBeenCalledTimes(1)

      unsubscribe()
      observable.set(2)

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple subscriptions and unsubscriptions', () => {
      const observable = new Observable(0)
      const listener1 = vi.fn()
      const listener2 = vi.fn()

      const unsubscribe1 = observable.subscribe(listener1)
      const unsubscribe2 = observable.subscribe(listener2)

      observable.set(1)
      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(1)

      unsubscribe1()
      observable.set(2)
      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(2)

      unsubscribe2()
      observable.set(3)
      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(2)
    })

    it('should not call listener on subscription', () => {
      const observable = new Observable(0)
      const listener = vi.fn()

      observable.subscribe(listener)

      expect(listener).not.toHaveBeenCalled()
    })
  })
})

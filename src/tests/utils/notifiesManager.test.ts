import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { notifyObservable, openNotify, closeNotify, closeAll } from '../../utils/notifiesManager'
import { NotifyAlignment } from '../../types'

describe('notifiesManager', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    closeAll()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    closeAll()
  })

  describe('notifyObservable', () => {
    it('should initialize with empty object', () => {
      const notifies = notifyObservable.get()
      expect(notifies).toEqual({})
    })
  })

  describe('openNotify', () => {
    it('should add a notification with default values', () => {
      const render = () => 'Test notification'

      openNotify({ render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft

      expect(notifies[alignment]).toBeDefined()
      expect(notifies[alignment].size).toBe(1)
    })

    it('should generate unique id if not provided', () => {
      const render = () => 'Test notification'

      openNotify({ render })
      openNotify({ render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft

      expect(notifies[alignment].size).toBe(2)
    })

    it('should use custom id when provided', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'custom-id', render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft
      const notify = Array.from(notifies[alignment].values())[0]

      expect(notify.id).toBe('custom-id')
    })

    it('should use custom duration when provided', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', duration: 5000, render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft
      const notify = notifies[alignment].get('test-1')

      expect(notify?.duration).toBe(5000)
    })

    it('should use default duration of 3500 when not provided', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft
      const notify = notifies[alignment].get('test-1')

      expect(notify?.duration).toBe(3500)
    })

    it('should respect custom alignment', () => {
      const render = () => 'Test notification'

      openNotify({
        id: 'test-1',
        alignment: NotifyAlignment.topRight,
        render
      })

      const notifies = notifyObservable.get()

      expect(notifies[NotifyAlignment.topRight]).toBeDefined()
      expect(notifies[NotifyAlignment.topRight].size).toBe(1)
    })

    it('should store render function', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft
      const notify = notifies[alignment].get('test-1')

      expect(notify?.render).toBe(render)
    })

    it('should store variant when provided', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', variant: 'success', render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft
      const notify = notifies[alignment].get('test-1')

      expect(notify?.variant).toBe('success')
    })

    it('should handle multiple notifications in same alignment', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })
      openNotify({ id: 'test-2', render })
      openNotify({ id: 'test-3', render })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft

      expect(notifies[alignment].size).toBe(3)
    })

    it('should handle notifications in different alignments', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', alignment: NotifyAlignment.topLeft, render })
      openNotify({ id: 'test-2', alignment: NotifyAlignment.topRight, render })
      openNotify({ id: 'test-3', alignment: NotifyAlignment.bottomLeft, render })

      const notifies = notifyObservable.get()

      expect(notifies[NotifyAlignment.topLeft].size).toBe(1)
      expect(notifies[NotifyAlignment.topRight].size).toBe(1)
      expect(notifies[NotifyAlignment.bottomLeft].size).toBe(1)
    })

    it('should replace notification with same id', () => {
      const render1 = () => 'First notification'
      const render2 = () => 'Second notification'

      openNotify({ id: 'test-1', render: render1 })
      openNotify({ id: 'test-1', render: render2 })

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft
      const notify = notifies[alignment].get('test-1')

      expect(notifies[alignment].size).toBe(1)
      expect(notify?.render).toBe(render2)
    })
  })

  describe('closeNotify', () => {
    it('should remove notification by id', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })
      closeNotify('test-1')

      vi.runAllTimers()

      const notifies = notifyObservable.get()

      expect(Object.keys(notifies).length).toBe(0)
    })

    it('should remove notification from correct alignment', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', alignment: NotifyAlignment.topLeft, render })
      openNotify({ id: 'test-2', alignment: NotifyAlignment.topRight, render })

      closeNotify('test-1')

      const notifies = notifyObservable.get()

      expect(notifies[NotifyAlignment.topRight].size).toBe(1)
    })

    it('should handle closing non-existent notification', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })

      expect(() => closeNotify('non-existent')).not.toThrow()
    })

    it('should keep other notifications when closing one', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })
      openNotify({ id: 'test-2', render })
      openNotify({ id: 'test-3', render })

      closeNotify('test-2')

      const notifies = notifyObservable.get()
      const alignment = NotifyAlignment.bottomLeft

      expect(notifies[alignment].size).toBe(2)
      expect(notifies[alignment].has('test-1')).toBe(true)
      expect(notifies[alignment].has('test-3')).toBe(true)
    })

    it('should cleanup alignment group after delay when last notification is closed', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })
      closeNotify('test-1')

      let notifies = notifyObservable.get()
      expect(notifies[NotifyAlignment.bottomLeft]).toBeDefined()

      vi.runAllTimers()

      notifies = notifyObservable.get()
      expect(notifies[NotifyAlignment.bottomLeft]).toBeUndefined()
    })
  })

  describe('closeAll', () => {
    it('should remove all notifications', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', alignment: NotifyAlignment.topLeft, render })
      openNotify({ id: 'test-2', alignment: NotifyAlignment.topRight, render })
      openNotify({ id: 'test-3', alignment: NotifyAlignment.bottomLeft, render })

      closeAll()

      const notifies = notifyObservable.get()

      expect(notifies).toEqual({})
    })

    it('should clear all timers', () => {
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })
      closeNotify('test-1')

      closeAll()

      vi.runAllTimers()

      const notifies = notifyObservable.get()
      expect(notifies).toEqual({})
    })

    it('should handle being called when no notifications exist', () => {
      expect(() => closeAll()).not.toThrow()

      const notifies = notifyObservable.get()
      expect(notifies).toEqual({})
    })
  })

  describe('observable integration', () => {
    it('should notify subscribers when notification is opened', () => {
      let notificationCount = 0
      const render = () => 'Test notification'

      notifyObservable.subscribe(() => {
        notificationCount++
      })

      openNotify({ render })

      expect(notificationCount).toBe(1)
    })

    it('should notify subscribers when notification is closed', () => {
      let notificationCount = 0
      const render = () => 'Test notification'

      openNotify({ id: 'test-1', render })

      notifyObservable.subscribe(() => {
        notificationCount++
      })

      closeNotify('test-1')

      expect(notificationCount).toBe(1)
    })

    it('should notify subscribers when all notifications are closed', () => {
      let notificationCount = 0
      const render = () => 'Test notification'

      openNotify({ render })

      notifyObservable.subscribe(() => {
        notificationCount++
      })

      closeAll()

      expect(notificationCount).toBe(1)
    })
  })
})

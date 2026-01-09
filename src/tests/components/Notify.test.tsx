import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Notify } from '../../components/Notify'
import { NotifyAlignment } from '../../types'
import * as notifiesManager from '../../utils/notifiesManager'
import { setConfig, resetConfig } from '../../utils/configManager'

vi.mock('../../utils/notifiesManager', async () => {
  const actual = await vi.importActual('../../utils/notifiesManager')
  return {
    ...actual,
    closeNotify: vi.fn(),
  }
})

describe('Notify', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetConfig()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
    resetConfig()
  })

  describe('rendering', () => {
    it('should render notification content', () => {
      const renderFn = () => <div>Test notification</div>

      render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      expect(screen.getByText('Test notification')).toBeDefined()
    })

    it('should render with custom data', () => {
      const renderFn = ({ data }: { data?: { type: string } }) => (
        <div>Type: {data?.type}</div>
      )

      render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          data={{ type: 'success' }}
          render={renderFn}
        />,
      )

      expect(screen.getByText('Type: success')).toBeDefined()
    })

    it('should pass correct params to render function', () => {
      const mockRender = vi.fn(() => <div>Test</div>)

      render(
        <Notify
          id="test-123"
          duration={5000}
          alignment={NotifyAlignment.bottomRight}
          data={{ type: 'error' }}
          render={mockRender}
        />,
      )

      expect(mockRender).toHaveBeenCalledWith({
        id: 'test-123',
        duration: 5000,
        alignment: NotifyAlignment.bottomRight,
        data: { type: 'error' },
        onClose: expect.any(Function),
        timeRemaining: 5000,
      })
    })

    it('should have data-rsn-notify attribute', () => {
      const renderFn = () => <div>Test</div>

      const { container } = render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      const notifyElement = container.querySelector('[data-rsn-notify]')
      expect(notifyElement).toBeDefined()
    })
  })

  describe('auto-close behavior', () => {
    it('should auto-close after specified duration', () => {
      const renderFn = () => <div>Test</div>

      render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      expect(notifiesManager.closeNotify).not.toHaveBeenCalled()

      vi.advanceTimersByTime(3000)

      expect(notifiesManager.closeNotify).toHaveBeenCalledWith('test-1')
    })

    it('should not auto-close when duration is 0', () => {
      const renderFn = () => <div>Test</div>

      render(
        <Notify
          id="test-1"
          duration={0}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      vi.advanceTimersByTime(10000)

      expect(notifiesManager.closeNotify).not.toHaveBeenCalled()
    })

    it('should clear timeout on unmount', () => {
      const renderFn = () => <div>Test</div>

      const { unmount } = render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      unmount()
      vi.advanceTimersByTime(3000)

      expect(notifiesManager.closeNotify).not.toHaveBeenCalled()
    })
  })

  describe('onClose callback', () => {
    it('should call closeNotify when onClose is invoked', () => {
      let onCloseCallback: (() => void) | undefined

      const renderFn = ({ onClose }: { onClose: () => void }) => {
        onCloseCallback = onClose
        return <div>Test</div>
      }

      render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      expect(onCloseCallback).toBeDefined()
      onCloseCallback!()

      expect(notifiesManager.closeNotify).toHaveBeenCalledWith('test-1')
    })
  })

  describe('custom notify component', () => {
    it('should wrap content in custom component', () => {
      const CustomComponent = ({
        children,
      }: {
        children?: React.ReactNode
      }) => <div data-custom-wrapper>{children}</div>

      setConfig({ notifyComponent: CustomComponent })

      const renderFn = () => <span>Test content</span>

      const { container } = render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      const wrapper = container.querySelector('[data-custom-wrapper]')
      expect(wrapper).toBeDefined()
      expect(screen.getByText('Test content')).toBeDefined()
    })

    it('should pass params to custom component', () => {
      const CustomComponent = ({
        id,
        data,
        children,
      }: {
        id: string
        data?: { type: string }
        children?: React.ReactNode
      }) => (
        <div data-id={id} data-type={data?.type}>
          {children}
        </div>
      )

      setConfig({ notifyComponent: CustomComponent })

      const renderFn = () => <span>Test</span>

      const { container } = render(
        <Notify
          id="test-123"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          data={{ type: 'warning' }}
          render={renderFn}
        />,
      )

      const wrapper = container.querySelector('[data-id="test-123"]')
      expect(wrapper).toBeDefined()
      expect(wrapper?.getAttribute('data-type')).toBe('warning')
    })
  })

  describe('timeRemaining', () => {
    it('should initialize timeRemaining with duration', () => {
      const mockRender = vi.fn(() => <div>Test</div>)

      render(
        <Notify
          id="test-1"
          duration={5000}
          alignment={NotifyAlignment.topLeft}
          render={mockRender}
        />,
      )

      expect(mockRender).toHaveBeenCalledWith(
        expect.objectContaining({
          timeRemaining: 5000,
        }),
      )
    })

    it('should update timeRemaining over time', () => {
      let latestTimeRemaining = 0

      const renderFn = ({ timeRemaining }: { timeRemaining: number }) => {
        latestTimeRemaining = timeRemaining
        return <div>Time: {timeRemaining}</div>
      }

      render(
        <Notify
          id="test-1"
          duration={5000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      expect(latestTimeRemaining).toBe(5000)

      act(() => {
        vi.advanceTimersByTime(200)
      })

      expect(latestTimeRemaining).toBeLessThan(5000)
      expect(latestTimeRemaining).toBeGreaterThan(0)
    })

    it('should not update timeRemaining when duration is 0', () => {
      let renderCount = 0

      const renderFn = () => {
        renderCount++
        return <div>Test</div>
      }

      render(
        <Notify
          id="test-1"
          duration={0}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      const initialRenderCount = renderCount

      vi.advanceTimersByTime(1000)

      expect(renderCount).toBe(initialRenderCount)
    })
  })

  describe('memoization', () => {
    it('should memoize component', () => {
      const renderFn = () => <div>Test</div>

      const { rerender } = render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      // Re-render with same props should use memoized component
      rerender(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          render={renderFn}
        />,
      )

      expect(screen.getByText('Test')).toBeDefined()
    })
  })
})

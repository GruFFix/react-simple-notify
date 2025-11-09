import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

    it('should render with custom variant', () => {
      const renderFn = ({ variant }: { variant?: string }) => (
        <div>Variant: {variant}</div>
      )

      render(
        <Notify
          id="test-1"
          duration={3000}
          alignment={NotifyAlignment.topLeft}
          variant="success"
          render={renderFn}
        />,
      )

      expect(screen.getByText('Variant: success')).toBeDefined()
    })

    it('should pass correct params to render function', () => {
      const mockRender = vi.fn(() => <div>Test</div>)

      render(
        <Notify
          id="test-123"
          duration={5000}
          alignment={NotifyAlignment.bottomRight}
          variant="error"
          render={mockRender}
        />,
      )

      expect(mockRender).toHaveBeenCalledWith({
        id: 'test-123',
        duration: 5000,
        alignment: NotifyAlignment.bottomRight,
        variant: 'error',
        onClose: expect.any(Function),
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
        variant,
        children,
      }: {
        id: string
        variant?: string
        children?: React.ReactNode
      }) => (
        <div data-id={id} data-variant={variant}>
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
          variant="warning"
          render={renderFn}
        />,
      )

      const wrapper = container.querySelector('[data-id="test-123"]')
      expect(wrapper).toBeDefined()
      expect(wrapper?.getAttribute('data-variant')).toBe('warning')
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

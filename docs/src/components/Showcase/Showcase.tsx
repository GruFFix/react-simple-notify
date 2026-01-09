// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { FC, useState, useEffect } from 'react'
import { notify, NotifyAlignment, config } from 'react-simple-notify'
import styles from './Showcase.module.scss'

interface PlaygroundConfig {
  alignment: NotifyAlignment
  duration: number
  pauseOnHover: boolean
  type: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'custom'
  showCloseButton: boolean
  message: string
  maxNotifications: number
}

interface Preset {
  id: string
  name: string
  description: string
  icon: string
  gradient: string
  config: Partial<PlaygroundConfig>
  demo: () => void
}

export const Showcase: FC = () => {
  const [, setNotificationCount] = useState(0)
  const [playgroundConfig, setPlaygroundConfig] = useState<PlaygroundConfig>({
    alignment: NotifyAlignment.topRight,
    duration: 3000,
    pauseOnHover: true,
    type: 'success',
    showCloseButton: true,
    message: 'Hello, World!',
    maxNotifications: 3,
  })

  // Update global config when maxNotifications changes
  useEffect(() => {
    config.set({
      maxNotifications: playgroundConfig.maxNotifications || 0,
    })
  }, [playgroundConfig.maxNotifications])

  const positions: { value: NotifyAlignment; label: string; icon: string }[] = [
    { value: NotifyAlignment.topLeft, label: 'Top Left', icon: '↖' },
    { value: NotifyAlignment.topCenter, label: 'Top Center', icon: '↑' },
    { value: NotifyAlignment.topRight, label: 'Top Right', icon: '↗' },
    { value: NotifyAlignment.bottomLeft, label: 'Bottom Left', icon: '↙' },
    { value: NotifyAlignment.bottomCenter, label: 'Bottom Center', icon: '↓' },
    { value: NotifyAlignment.bottomRight, label: 'Bottom Right', icon: '↘' },
  ]

  const typeStyles = {
    success: {
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      icon: '✓',
      title: 'Success!',
      message: 'Operation completed successfully',
    },
    error: {
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      icon: '✗',
      title: 'Error',
      message: 'Something went wrong',
    },
    warning: {
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: '⚠',
      title: 'Warning',
      message: 'Please be careful',
    },
    info: {
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      icon: 'ⓘ',
      title: 'Info',
      message: 'Here is some information',
    },
    loading: {
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      icon: '⏳',
      title: 'Loading...',
      message: 'Please wait',
    },
    custom: {
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
      icon: '🎨',
      title: 'Custom',
      message: 'Fully customizable',
    },
  }

  const showNotification = () => {
    const style = typeStyles[playgroundConfig.type]
    setNotificationCount((prev) => prev + 1)

    if (playgroundConfig.type === 'loading') {
      let progress = 0
      const id = notify.open({
        alignment: playgroundConfig.alignment,
        duration: 0,
        pauseOnHover: playgroundConfig.pauseOnHover,
        data: { progress: 0 },
        render: ({ data }) => (
          <div className={styles.notification}>
            <div className={styles.icon} style={{ background: style.gradient }}>
              {style.icon}
            </div>
            <div className={styles.content}>
              <h4>{style.title}</h4>
              <p>{data?.progress || 0}% complete</p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${data?.progress || 0}%`,
                    background: style.gradient,
                  }}
                />
              </div>
            </div>
          </div>
        ),
      })

      const interval = setInterval(() => {
        progress += 20
        if (progress > 100) {
          clearInterval(interval)
          notify.update(id, {
            duration: 2000,
            render: ({ onClose }) => (
              <div className={styles.notification}>
                <div
                  className={styles.icon}
                  style={{ background: typeStyles.success.gradient }}
                >
                  ✓
                </div>
                <div className={styles.content}>
                  <h4>Complete!</h4>
                  <p>Processing finished</p>
                </div>
                {playgroundConfig.showCloseButton && (
                  <button onClick={onClose} className={styles.close}>
                    ✕
                  </button>
                )}
              </div>
            ),
          })
        } else {
          notify.update(id, { data: { progress } })
        }
      }, 400)
    } else if (playgroundConfig.type === 'custom') {
      notify.open({
        alignment: playgroundConfig.alignment,
        duration: playgroundConfig.duration,
        pauseOnHover: playgroundConfig.pauseOnHover,
        render: ({ onClose }) => (
          <div className={styles.customNotification}>
            <div className={styles.customHeader}>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ReactNotify"
                alt="Avatar"
                className={styles.avatar}
              />
              <div>
                <h4>Team Notification</h4>
                <p className={styles.timestamp}>Just now</p>
              </div>
              {playgroundConfig.showCloseButton && (
                <button onClick={onClose} className={styles.customClose}>
                  ✕
                </button>
              )}
            </div>
            <div className={styles.customBody}>
              <p>{playgroundConfig.message || 'New message from your team!'}</p>
            </div>
            <div className={styles.customFooter}>
              <button className={styles.customBtn} onClick={onClose}>
                Reply
              </button>
              <button className={styles.customBtn} onClick={onClose}>
                View
              </button>
            </div>
          </div>
        ),
      })
    } else {
      notify.open({
        alignment: playgroundConfig.alignment,
        duration: playgroundConfig.duration,
        pauseOnHover: playgroundConfig.pauseOnHover,
        render: ({ onClose }) => (
          <div className={styles.notification}>
            <div className={styles.icon} style={{ background: style.gradient }}>
              {style.icon}
            </div>
            <div className={styles.content}>
              <h4>{style.title}</h4>
              <p>{playgroundConfig.message || style.message}</p>
            </div>
            {playgroundConfig.showCloseButton && (
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            )}
          </div>
        ),
      })
    }
  }

  const presets: Preset[] = [
    // Featured: Progress Bar
    {
      id: 'progress-bar',
      name: 'Progress Bar',
      description: 'Auto-close with progress',
      icon: '⏱️',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      config: { type: 'info', duration: 5000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 5000,
          pauseOnHover: true,
          render: ({ onClose, timeRemaining, duration }) => {
            const progress = ((duration - timeRemaining) / duration) * 100
            const secondsLeft = Math.ceil(timeRemaining / 1000)

            return (
              <div className={styles.notification}>
                <div
                  className={styles.icon}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  }}
                >
                  ⏱️
                </div>
                <div className={styles.content}>
                  <h4>Auto-closing in {secondsLeft}s</h4>
                  <p>Hover to pause the timer</p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      }}
                    />
                  </div>
                </div>
                <button onClick={onClose} className={styles.close}>
                  ✕
                </button>
              </div>
            )
          },
        })
      },
    },
    // System Notifications
    {
      id: 'success',
      name: 'Success',
      description: 'Confirm successful actions',
      icon: '✓',
      gradient: typeStyles.success.gradient,
      config: { type: 'success', duration: 3000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 3000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{ background: typeStyles.success.gradient }}
              >
                ✓
              </div>
              <div className={styles.content}>
                <h4>Success!</h4>
                <p>Your changes have been saved</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'error',
      name: 'Error',
      description: 'Handle failures',
      icon: '✗',
      gradient: typeStyles.error.gradient,
      config: { type: 'error', duration: 4000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 4000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{ background: typeStyles.error.gradient }}
              >
                ✗
              </div>
              <div className={styles.content}>
                <h4>Error</h4>
                <p>Failed to save. Try again.</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'promise',
      name: 'Promise',
      description: 'Track async tasks',
      icon: '⏳',
      gradient: typeStyles.loading.gradient,
      config: { type: 'loading', duration: 0 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        let progress = 0
        const id = notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 0,
          data: { progress: 0 },
          render: ({ data }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{ background: typeStyles.loading.gradient }}
              >
                ⏳
              </div>
              <div className={styles.content}>
                <h4>Loading...</h4>
                <p>{data?.progress || 0}% complete</p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${data?.progress || 0}%`,
                      background: typeStyles.loading.gradient,
                    }}
                  />
                </div>
              </div>
            </div>
          ),
        })

        const interval = setInterval(() => {
          progress += 20
          if (progress > 100) {
            clearInterval(interval)
            notify.update(id, {
              duration: 2000,
              render: ({ onClose }) => (
                <div className={styles.notification}>
                  <div
                    className={styles.icon}
                    style={{ background: typeStyles.success.gradient }}
                  >
                    ✓
                  </div>
                  <div className={styles.content}>
                    <h4>Complete!</h4>
                    <p>Upload finished</p>
                  </div>
                  <button onClick={onClose} className={styles.close}>
                    ✕
                  </button>
                </div>
              ),
            })
          } else {
            notify.update(id, { data: { progress } })
          }
        }, 400)
      },
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Full flexibility',
      icon: '🎨',
      gradient: typeStyles.custom.gradient,
      config: { type: 'custom', duration: 5000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 5000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.customNotification}>
              <div className={styles.customHeader}>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Avatar"
                  className={styles.avatar}
                />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p className={styles.timestamp}>2 min ago</p>
                </div>
                <button onClick={onClose} className={styles.customClose}>
                  ✕
                </button>
              </div>
              <div className={styles.customBody}>
                <p>Mentioned you: "Great work! 🎉"</p>
              </div>
              <div className={styles.customFooter}>
                <button className={styles.customBtn} onClick={onClose}>
                  Reply
                </button>
                <button className={styles.customBtn} onClick={onClose}>
                  View
                </button>
              </div>
            </div>
          ),
        })
      },
    },
    {
      id: 'warning',
      name: 'Warning',
      description: 'Show alerts',
      icon: '⚠',
      gradient: typeStyles.warning.gradient,
      config: { type: 'warning', duration: 3500 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 3500,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{ background: typeStyles.warning.gradient }}
              >
                ⚠
              </div>
              <div className={styles.content}>
                <h4>Warning</h4>
                <p>Action cannot be undone</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'info',
      name: 'Info',
      description: 'Share updates',
      icon: 'ⓘ',
      gradient: typeStyles.info.gradient,
      config: { type: 'info', duration: 3000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 3000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{ background: typeStyles.info.gradient }}
              >
                ⓘ
              </div>
              <div className={styles.content}>
                <h4>Info</h4>
                <p>New version available</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    // Real-world Examples
    {
      id: 'payment',
      name: 'Payment',
      description: 'Transaction confirmed',
      icon: '💳',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      config: { type: 'success', duration: 4000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 4000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                }}
              >
                💳
              </div>
              <div className={styles.content}>
                <h4>Payment Successful</h4>
                <p>$49.99 charged to card ending in 4242</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'upload',
      name: 'Upload',
      description: 'File upload complete',
      icon: '📁',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      config: { type: 'info', duration: 3500 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 3500,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                }}
              >
                📁
              </div>
              <div className={styles.content}>
                <h4>Upload Complete</h4>
                <p>presentation.pdf (2.4 MB)</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'message',
      name: 'Message',
      description: 'New message received',
      icon: '💬',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
      config: { type: 'custom', duration: 5000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.topRight,
          duration: 5000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.customNotification}>
              <div className={styles.customHeader}>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="Avatar"
                  className={styles.avatar}
                />
                <div>
                  <h4>John Smith</h4>
                  <p className={styles.timestamp}>Just now</p>
                </div>
                <button onClick={onClose} className={styles.customClose}>
                  ✕
                </button>
              </div>
              <div className={styles.customBody}>
                <p>Hey! Are we still on for the meeting?</p>
              </div>
              <div className={styles.customFooter}>
                <button className={styles.customBtn} onClick={onClose}>
                  Reply
                </button>
                <button className={styles.customBtn} onClick={onClose}>
                  View
                </button>
              </div>
            </div>
          ),
        })
      },
    },
    {
      id: 'download',
      name: 'Download',
      description: 'Download started',
      icon: '⬇️',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      config: { type: 'loading', duration: 0 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        let progress = 0
        const id = notify.open({
          alignment: NotifyAlignment.bottomRight,
          duration: 0,
          data: { progress: 0 },
          render: ({ data }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                }}
              >
                ⬇️
              </div>
              <div className={styles.content}>
                <h4>Downloading...</h4>
                <p>document.zip - {data?.progress || 0}%</p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${data?.progress || 0}%`,
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    }}
                  />
                </div>
              </div>
            </div>
          ),
        })

        const interval = setInterval(() => {
          progress += 15
          if (progress > 100) {
            clearInterval(interval)
            notify.update(id, {
              duration: 2000,
              render: ({ onClose }) => (
                <div className={styles.notification}>
                  <div
                    className={styles.icon}
                    style={{ background: typeStyles.success.gradient }}
                  >
                    ✓
                  </div>
                  <div className={styles.content}>
                    <h4>Download Complete!</h4>
                    <p>document.zip saved</p>
                  </div>
                  <button onClick={onClose} className={styles.close}>
                    ✕
                  </button>
                </div>
              ),
            })
          } else {
            notify.update(id, { data: { progress } })
          }
        }, 500)
      },
    },
    {
      id: 'permission',
      name: 'Permission',
      description: 'Request user permission',
      icon: '🔔',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      config: { type: 'warning', duration: 0 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        const id = notify.open({
          alignment: NotifyAlignment.topCenter,
          duration: 0,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                }}
              >
                🔔
              </div>
              <div className={styles.content}>
                <h4>Enable Notifications?</h4>
                <p>Stay updated with real-time alerts</p>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.75rem',
                  }}
                >
                  <button
                    onClick={() => {
                      notify.close(id)
                      notify.open({
                        alignment: NotifyAlignment.topRight,
                        duration: 2000,
                        render: () => (
                          <div className={styles.notification}>
                            <div
                              className={styles.icon}
                              style={{
                                background: typeStyles.success.gradient,
                              }}
                            >
                              ✓
                            </div>
                            <div className={styles.content}>
                              <h4>Notifications Enabled!</h4>
                            </div>
                          </div>
                        ),
                      })
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    Allow
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0,0,0,0.05)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#6b7280',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          ),
        })
      },
    },
    {
      id: 'undo',
      name: 'Undo',
      description: 'Action with undo option',
      icon: '↩️',
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      config: { type: 'info', duration: 5000 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        const id = notify.open({
          alignment: NotifyAlignment.bottomLeft,
          duration: 5000,
          pauseOnHover: true,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                }}
              >
                🗑️
              </div>
              <div className={styles.content}>
                <h4>Item Deleted</h4>
                <p>3 files moved to trash</p>
                <button
                  onClick={() => {
                    notify.close(id)
                    notify.open({
                      alignment: NotifyAlignment.topRight,
                      duration: 2000,
                      render: () => (
                        <div className={styles.notification}>
                          <div
                            className={styles.icon}
                            style={{ background: typeStyles.success.gradient }}
                          >
                            ↩️
                          </div>
                          <div className={styles.content}>
                            <h4>Restored!</h4>
                            <p>Files recovered successfully</p>
                          </div>
                        </div>
                      ),
                    })
                  }}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.375rem 0.75rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                  }}
                >
                  Undo
                </button>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'network',
      name: 'Offline',
      description: 'Network status alert',
      icon: '📡',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      config: { type: 'error', duration: 0 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.bottomCenter,
          duration: 0,
          render: ({ onClose }) => (
            <div className={styles.notification}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                }}
              >
                📡
              </div>
              <div className={styles.content}>
                <h4>No Internet Connection</h4>
                <p>Check your network and try again</p>
              </div>
              <button onClick={onClose} className={styles.close}>
                ✕
              </button>
            </div>
          ),
        })
      },
    },
    {
      id: 'cookie',
      name: 'Cookie',
      description: 'Privacy consent banner',
      icon: '🍪',
      gradient: 'linear-gradient(135deg, #fb923c, #f97316)',
      config: { type: 'info', duration: 0 },
      demo: () => {
        setNotificationCount((prev) => prev + 1)
        notify.open({
          alignment: NotifyAlignment.bottomCenter,
          duration: 0,
          render: ({ onClose }) => (
            <div className={styles.notification} style={{ maxWidth: '500px' }}>
              <div
                className={styles.icon}
                style={{
                  background: 'linear-gradient(135deg, #fb923c, #f97316)',
                }}
              >
                🍪
              </div>
              <div className={styles.content}>
                <h4>Cookie Policy</h4>
                <p style={{ fontSize: '0.8125rem' }}>
                  We use cookies to enhance your experience
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.75rem',
                  }}
                >
                  <button
                    onClick={onClose}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    Accept All
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0,0,0,0.05)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#6b7280',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ),
        })
      },
    },
  ]

  const generateCode = () => {
    const style = typeStyles[playgroundConfig.type]
    const configSetup = playgroundConfig.maxNotifications
      ? `// Set global max notifications\nconfig.set({ maxNotifications: ${playgroundConfig.maxNotifications} })\n\n`
      : ''
    return `${configSetup}notify.open({
  alignment: NotifyAlignment.${Object.keys(NotifyAlignment).find(
    (key) =>
      NotifyAlignment[key as keyof typeof NotifyAlignment] ===
      playgroundConfig.alignment,
  )},
  duration: ${playgroundConfig.duration},
  pauseOnHover: ${playgroundConfig.pauseOnHover},
  render: ({ onClose }) => (
    <div className="notification">
      <div className="icon">${style.icon}</div>
      <div className="content">
        <h4>${style.title}</h4>
        <p>${playgroundConfig.message}</p>
      </div>${
        playgroundConfig.showCloseButton
          ? `
      <button onClick={onClose}>✕</button>`
          : ''
      }
    </div>
  )
})`
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode())
    notify.open({
      alignment: NotifyAlignment.bottomRight,
      duration: 2000,
      render: () => (
        <div className={styles.copyNotification}>
          <span>📋</span>
          <span>Code copied to clipboard!</span>
        </div>
      ),
    })
  }

  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            <span>Interactive Playground</span>
          </div>
          <h2>
            Try It Live
            <span className={styles.gradient}>Build & Test In Real-Time</span>
          </h2>
          <p>Customize every aspect and see instant results</p>
        </div>

        {/* Quick Presets Section */}
        <div className={styles.presetsSection}>
          <h3 className={styles.presetsTitle}>Quick Presets</h3>
          <p className={styles.presetsSubtitle}>
            Click any preset to see it in action
          </p>
          <div className={styles.presetsGrid}>
            {presets.map((preset) => (
              <button
                key={preset.id}
                className={styles.presetCard}
                onClick={preset.demo}
              >
                <div
                  className={styles.presetIcon}
                  style={{ background: preset.gradient }}
                >
                  {preset.icon}
                </div>
                <div className={styles.presetContent}>
                  <h4>{preset.name}</h4>
                  <p>{preset.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Left: Controls */}
          <div className={styles.controls}>
            <div className={styles.controlSection}>
              <h3>Position</h3>
              <div className={styles.positionGrid}>
                {positions.map((pos) => (
                  <button
                    key={pos.value}
                    className={`${styles.positionBtn} ${
                      playgroundConfig.alignment === pos.value
                        ? styles.active
                        : ''
                    }`}
                    onClick={() =>
                      setPlaygroundConfig({
                        ...playgroundConfig,
                        alignment: pos.value,
                      })
                    }
                    title={pos.label}
                  >
                    {pos.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlSection}>
              <h3>Type</h3>
              <div className={styles.variantGrid}>
                {Object.keys(typeStyles).map((type) => (
                  <button
                    key={type}
                    className={`${styles.variantBtn} ${
                      playgroundConfig.type === type ? styles.active : ''
                    }`}
                    onClick={() =>
                      setPlaygroundConfig({
                        ...playgroundConfig,
                        type: type as PlaygroundConfig['type'],
                      })
                    }
                    style={{
                      background:
                        playgroundConfig.type === type
                          ? typeStyles[type as keyof typeof typeStyles].gradient
                          : undefined,
                    }}
                  >
                    {typeStyles[type as keyof typeof typeStyles].icon}{' '}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlSection}>
              <h3>
                Duration (
                {playgroundConfig.duration === 0
                  ? 'Never closes'
                  : `${playgroundConfig.duration}ms`}
                )
              </h3>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={playgroundConfig.duration}
                onChange={(e) =>
                  setPlaygroundConfig({
                    ...playgroundConfig,
                    duration: parseInt(e.target.value),
                  })
                }
                className={styles.slider}
              />
            </div>

            <div className={styles.controlSection}>
              <h3>Message</h3>
              <input
                type="text"
                value={playgroundConfig.message}
                onChange={(e) =>
                  setPlaygroundConfig({
                    ...playgroundConfig,
                    message: e.target.value,
                  })
                }
                className={styles.input}
                placeholder="Enter notification message..."
              />
            </div>

            <div className={styles.controlSection}>
              <h3>
                Max Notifications (
                {playgroundConfig.maxNotifications === 0
                  ? 'Unlimited'
                  : playgroundConfig.maxNotifications}
                )
              </h3>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={playgroundConfig.maxNotifications}
                onChange={(e) =>
                  setPlaygroundConfig({
                    ...playgroundConfig,
                    maxNotifications: parseInt(e.target.value),
                  })
                }
                className={styles.slider}
              />
            </div>

            <div className={styles.controlSection}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={playgroundConfig.pauseOnHover}
                  onChange={(e) =>
                    setPlaygroundConfig({
                      ...playgroundConfig,
                      pauseOnHover: e.target.checked,
                    })
                  }
                />
                <span>Pause on Hover</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={playgroundConfig.showCloseButton}
                  onChange={(e) =>
                    setPlaygroundConfig({
                      ...playgroundConfig,
                      showCloseButton: e.target.checked,
                    })
                  }
                />
                <span>Show Close Button</span>
              </label>
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.showBtn} onClick={showNotification}>
                <span>🚀</span>
                <span>Show Notification</span>
              </button>
            </div>
            <button
              className={styles.closeAllBtn}
              onClick={() => notify.closeAll()}
            >
              <span>🗑️</span>
              <span>Close All</span>
            </button>
          </div>

          {/* Right: Code Preview */}
          <div className={styles.codeSection}>
            <div className={styles.codePreview}>
              <div className={styles.codeHeader}>
                <div className={styles.codeTabs}>
                  <div className={styles.codeTab}>
                    <span className={styles.codeTabIcon}>⚛</span>
                    <span>React + TypeScript</span>
                  </div>
                </div>
                <button className={styles.copyButton} onClick={copyCode}>
                  <span>📋</span>
                  <span>Copy</span>
                </button>
              </div>
              <div className={styles.codeContent}>
                <pre>
                  <code>{generateCode()}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

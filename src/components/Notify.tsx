import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { closeNotify } from '../utils/notifiesManager.ts'
import { configObservable } from '../utils/configManager.ts'

import { NotifyOptions } from '../types.ts'

export const Notify: React.FC<NotifyOptions> = memo(
  ({ id, duration = 0, render, alignment, pauseOnHover, data }) => {
    const { notifyComponent, pauseOnHover: globalPauseOnHover } =
      configObservable.get()

    const isAutoClose = duration > 0
    const shouldPauseOnHover = pauseOnHover ?? globalPauseOnHover

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const updateIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const remainingTimeRef = useRef(duration)
    const startTimeRef = useRef<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(duration)

    const handleClose = useCallback(() => {
      closeNotify(id)
    }, [id])

    const clearTimer = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
        updateIntervalRef.current = null
      }
    }, [])

    const startTimer = useCallback(
      (timeLeft: number) => {
        startTimeRef.current = Date.now()
        timerRef.current = setTimeout(() => {
          closeNotify(id)
        }, timeLeft)

        // Update timeRemaining every 100ms for smooth progress bars
        if (isAutoClose) {
          updateIntervalRef.current = setInterval(() => {
            if (startTimeRef.current !== null) {
              const elapsed = Date.now() - startTimeRef.current
              const remaining = Math.max(0, timeLeft - elapsed)
              setTimeRemaining(remaining)

              if (remaining === 0) {
                clearInterval(updateIntervalRef.current!)
              }
            }
          }, 100)
        }
      },
      [id, isAutoClose],
    )

    const handleMouseEnter = useCallback(() => {
      if (!shouldPauseOnHover || !isAutoClose) return

      setIsPaused(true)
      clearTimer()

      if (startTimeRef.current !== null) {
        const elapsed = Date.now() - startTimeRef.current
        const remaining = Math.max(0, remainingTimeRef.current - elapsed)
        remainingTimeRef.current = remaining
        setTimeRemaining(remaining)
      }
    }, [shouldPauseOnHover, isAutoClose, clearTimer])

    const handleMouseLeave = useCallback(() => {
      if (!shouldPauseOnHover || !isAutoClose) return

      setIsPaused(false)
      startTimer(remainingTimeRef.current)
    }, [shouldPauseOnHover, isAutoClose, startTimer])

    useEffect(() => {
      if (isAutoClose) {
        remainingTimeRef.current = duration
        startTimer(duration)
      }

      return () => {
        clearTimer()
      }
    }, [id, duration, isAutoClose, startTimer, clearTimer])

    const params = {
      id,
      duration,
      alignment,
      onClose: handleClose,
      data,
      timeRemaining,
    }

    let content = render(params)

    if (notifyComponent && notifyComponent !== React.Fragment) {
      if (typeof notifyComponent === 'function') {
        content = React.createElement(notifyComponent, params, content)
      } else if (React.isValidElement(notifyComponent)) {
        content = React.cloneElement(notifyComponent, params, content)
      }
    }

    return (
      <div
        data-rsn-notify
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        data-paused={isPaused || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </div>
    )
  },
)

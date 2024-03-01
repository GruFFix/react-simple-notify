import { useCallback, useEffect, useState } from 'react'

type Observable<T> = {
  value: T
  listeners: Set<() => void>
  get: () => T
  set: (value: T | ((currentValue: T) => T)) => void
  subscribe: (listener: () => void) => void
  unsubscribe: (listener: () => void) => void
  notify: () => void
}

const createObservable = <T>(initialValue: T): Observable<T> => {
  const obs: Observable<T> = {
    value: initialValue,
    listeners: new Set(),
    get() {
      readObservables.add(obs)
      return obs.value
    },
    set(value: T | ((currentValue: T) => T)) {
      const newValue =
        typeof value === 'function'
          ? (value as (currentValue: T) => T)(obs.value)
          : value
      obs.value = newValue
      obs.notify()
    },
    subscribe(listener) {
      obs.listeners.add(listener)
    },
    unsubscribe(listener) {
      obs.listeners.delete(listener)
    },
    notify() {
      obs.listeners.forEach((listener) => listener())
    },
  }
  return obs
}

const useRerender = () => {
  const [, setState] = useState({})
  return useCallback(() => setState({}), [])
}

const readObservables = new Set<Observable<any>>()

export const createUseStore = <T extends object>(initialState: T) => {
  const store = Object.keys(initialState).reduce(
    (acc, key) => {
      const typedKey = key as keyof T // Типовое утверждение
      acc[typedKey] = createObservable(initialState[typedKey])
      return acc
    },
    {} as { [K in keyof T]: Observable<T[K]> },
  )

  return (keys?: Array<keyof T>) => {
    if (!keys) {
      return Object.keys(store).reduce(
        (acc, key) => {
          const typedKey = key as keyof T // Нужно использовать типовое утверждение и здесь
          acc[typedKey] = store[typedKey]
          return acc
        },
        {} as { [K in keyof T]: Observable<T[K]> },
      )
    }

    const rerender = useRerender()

    useEffect(() => {
      const observables = keys.map((key) => store[key])

      observables.forEach((observable) => {
        observable.subscribe(rerender)
      })
      return () => {
        observables.forEach((observable) => {
          observable.unsubscribe(rerender)
        })
      }
    }, [keys.join(','), rerender])

    return keys.reduce(
      (acc, key) => {
        acc[key] = store[key]
        return acc
      },
      {} as { [K in keyof T]: Observable<T[K]> },
    )
  }
}

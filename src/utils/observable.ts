export class Observable<T> {
  private value: T
  private listeners: Set<() => void> = new Set()

  constructor(initialValue: T) {
    this.value = initialValue
  }

  public get(): T {
    return this.value
  }

  public set(newValue: T | ((prevValue: T) => T)): void {
    this.value =
      typeof newValue === 'function'
        ? (newValue as (prevValue: T) => T)(this.value)
        : newValue

    this.notify()
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener()
      } catch (error) {
        console.error('Observable listener error:', error)
      }
    })
  }
}

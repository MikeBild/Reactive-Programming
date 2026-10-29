/**
 * Ein minimales Signal ohne Framework: ein aktueller Wert, synchron lesbar,
 * mit Benachrichtigung bei Änderungen. Angular, Solid, Preact und Vue haben
 * dasselbe Modell mit mehr Komfort, etwa computed und effect.
 */
export type Signal<T> = {
  (): T
  /** Ruft listener bei jeder Änderung auf, nicht sofort. Gibt eine Function zum Abmelden zurück. */
  subscribe: (listener: (value: T) => void) => () => void
}

export type WritableSignal<T> = Signal<T> & {
  set: (value: T) => void
  update: (fn: (value: T) => T) => void
}

export const signal = <T>(initial: T): WritableSignal<T> => {
  let value = initial
  const listeners = new Set<(value: T) => void>()

  const read = (() => value) as WritableSignal<T>
  read.subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  read.set = (next) => {
    if (Object.is(next, value)) return
    value = next
    for (const listener of [...listeners]) listener(value)
  }
  read.update = (fn) => read.set(fn(value))
  return read
}

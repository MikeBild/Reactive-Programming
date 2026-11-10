/**
 * A minimal Signal without a framework, as in the handout of the lesson: a
 * current value, readable synchronously via get, changeable via set, with watch for
 * changes. Angular, Solid, Preact, and Vue have the same model with more
 * convenience, such as computed and effect.
 *
 * Small addition to the handout: set with the same value notifies nobody.
 */
export type Signal<T> = {
  get: () => T
  set: (value: T) => void
  /** Calls listener on every change, not immediately. Returns a function to unsubscribe. */
  watch: (listener: (value: T) => void) => () => void
}

export const signal = <T>(initial: T): Signal<T> => {
  let value = initial
  const listeners = new Set<(value: T) => void>()
  return {
    get: () => value,
    set: (next) => {
      if (Object.is(next, value)) return
      value = next
      for (const listener of [...listeners]) listener(next)
    },
    watch: (listener) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

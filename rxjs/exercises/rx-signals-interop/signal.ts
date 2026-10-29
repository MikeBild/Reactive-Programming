/**
 * Ein minimales Signal ohne Framework, wie im Handout der Lektion: ein
 * aktueller Wert, synchron lesbar per get, änderbar per set, mit watch für
 * Änderungen. Angular, Solid, Preact und Vue haben dasselbe Modell mit mehr
 * Komfort, etwa computed und effect.
 *
 * Kleine Ergänzung zum Handout: set mit demselben Wert benachrichtigt niemanden.
 */
export type Signal<T> = {
  get: () => T
  set: (value: T) => void
  /** Ruft listener bei jeder Änderung auf, nicht sofort. Gibt eine Function zum Abmelden zurück. */
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

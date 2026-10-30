/**
 * Lektion rx-operators-pipe: Operatoren sind Functions in einer pipe
 *
 * Aufgabe: Verarbeite einen Stream von Nachrichten mit Typ und Payload,
 * filtere nach Typ, lass Duplikate per distinctUntilChanged mit
 * Compare Function weg und zähle mit scan.
 *
 * Schreib dafür zwei eigene Operatoren mit pipe() ohne Quelle.
 * Ein Duplikat ist eine Nachricht mit derselben id wie die direkt davor,
 * etwa weil die Queue sie nach einem Timeout noch einmal zustellt.
 */
import { type OperatorFunction } from 'rxjs'

export type Message<P = unknown> = { type: string; id: string; payload: P }

/** Lässt nur Nachrichten eines Typs durch, ohne direkt wiederholte ids, und liefert deren Payload. */
export const ofType = <P>(type: string): OperatorFunction<Message, P> => {
  // TODO: filter nach type, distinctUntilChanged mit Vergleich der id, map auf payload
  throw new Error('TODO: ofType')
}

/** Zählt die Nachrichten eines Typs ohne Duplikate, gibt nach jeder Nachricht den Zwischenstand aus. */
export const countOfType = (type: string): OperatorFunction<Message, number> => {
  // TODO: ofType wiederverwenden und mit scan zählen
  throw new Error('TODO: countOfType')
}

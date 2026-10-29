/**
 * Lektion rx-error-handling: Ein Fehler beendet den Stream
 *
 * Aufgabe: Lade drei URLs mit mergeMap, gib jedem Request ein Timeout von
 * zwei Sekunden, wiederhole zweimal mit Backoff und liefere bei Fehlern einen
 * Fehlerwert statt abzubrechen.
 *
 * Backoff: vor dem n-ten Wiederholen wartest du 2 ** n * 250 ms,
 * also 500 ms vor dem ersten und 1000 ms vor dem zweiten Retry.
 * Wichtig: Fang Fehler im inneren Stream ab, sonst reißt ein kaputter Request
 * alle anderen mit.
 */
import { Observable } from 'rxjs'

export type Result<T> =
  | { kind: 'ok'; url: string; value: T }
  | { kind: 'error'; url: string; message: string }

export const loadAll = <T>(urls: string[], fetchJson: (url: string) => Observable<T>): Observable<Result<T>> => {
  // TODO: from(urls) mit mergeMap, innen timeout, retry mit delay, map auf ok, catchError auf error
  throw new Error('TODO: loadAll')
}

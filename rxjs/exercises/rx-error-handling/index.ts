/**
 * Lesson rx-error-handling: An error ends the stream
 *
 * Task: Load three URLs with mergeMap, give every request a timeout of
 * two seconds, retry twice with backoff, and on errors deliver an
 * error value instead of aborting.
 *
 * Backoff: before the n-th retry you wait 2 ** n * 250 ms,
 * so 500 ms before the first and 1,000 ms before the second retry.
 * Important: catch errors in the inner stream, otherwise one broken request
 * takes all the others down with it.
 */
import { Observable } from 'rxjs'

export type Result<T> =
  | { kind: 'ok'; url: string; value: T }
  | { kind: 'error'; url: string; message: string }

export const loadAll = <T>(urls: string[], fetchJson: (url: string) => Observable<T>): Observable<Result<T>> => {
  // TODO: from(urls) with mergeMap, inside timeout, retry with delay, map to ok, catchError to error
  throw new Error('TODO: loadAll')
}

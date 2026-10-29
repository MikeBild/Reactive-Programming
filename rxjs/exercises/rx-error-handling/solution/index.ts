import { catchError, from, map, mergeMap, of, retry, timeout, timer, type Observable } from 'rxjs'

export type Result<T> =
  | { kind: 'ok'; url: string; value: T }
  | { kind: 'error'; url: string; message: string }

export const loadAll = <T>(urls: string[], fetchJson: (url: string) => Observable<T>): Observable<Result<T>> =>
  from(urls).pipe(
    mergeMap((url) =>
      fetchJson(url).pipe(
        // timeout vor retry: jeder Versuch bekommt seine eigenen zwei Sekunden
        timeout({ first: 2_000 }),
        retry({ count: 2, delay: (_error, attempt) => timer(2 ** attempt * 250) }),
        map((value): Result<T> => ({ kind: 'ok', url, value })),
        // catchError innen: der Fehler wird zum Wert, die anderen Requests laufen weiter
        catchError((error: unknown) =>
          of<Result<T>>({ kind: 'error', url, message: error instanceof Error ? error.message : String(error) }),
        ),
      ),
    ),
  )

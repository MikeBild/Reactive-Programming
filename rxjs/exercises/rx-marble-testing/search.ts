/**
 * Die Suche, die du in dieser Lektion testest. Sie ist fertig, du schreibst nur die Tests.
 * Quellen und Service kommen als Parameter rein. Deshalb brauchst du keine Mocks.
 */
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, type Observable } from 'rxjs'

export type SearchState = { kind: 'ok'; term: string; results: string[] } | { kind: 'error'; term: string }

export const searchResults = (
  term$: Observable<string>,
  search: (term: string) => Observable<string[]>,
): Observable<SearchState> =>
  term$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) =>
      search(term).pipe(
        map((results): SearchState => ({ kind: 'ok', term, results })),
        catchError(() => of<SearchState>({ kind: 'error', term })),
      ),
    ),
  )

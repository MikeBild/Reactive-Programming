/**
 * The product search of the workshop shop that you test in this lesson. It
 * is finished, you only write the tests. Sources and service come in as
 * parameters. That is why you need no mocks.
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

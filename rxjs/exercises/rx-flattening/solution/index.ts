import { concatMap, exhaustMap, mergeMap, switchMap, type Observable } from 'rxjs'

/** Search: only the result for the latest term counts. */
export const searchResults = (
  term$: Observable<string>,
  search: (term: string) => Observable<string[]>,
): Observable<string[]> =>
  // switchMap: a new term makes the running search worthless, so cancel and switch.
  // Read requests can be canceled without risk.
  term$.pipe(switchMap((term) => search(term)))

/** Autosave: save every change, in the order in which it happened. */
export const autosave = <T>(change$: Observable<T>, save: (change: T) => Observable<T>): Observable<T> =>
  // concatMap: no change may get lost and the order must be right.
  // switchMap could cancel a half-finished save, mergeMap could swap the order.
  change$.pipe(concatMap((change) => save(change)))

/** Upload queue: upload files in parallel, but at most concurrency at a time. */
export const uploadQueue = (
  file$: Observable<string>,
  upload: (file: string) => Observable<string>,
  concurrency: number,
): Observable<string> =>
  // mergeMap with a limit: uploads are independent, parallel is faster.
  // Without a limit, a hundred files would run as a hundred requests at once.
  file$.pipe(mergeMap((file) => upload(file), concurrency))

/** Login: a double click must not start a second request while the first one is running. */
export const loginOnClick = <S>(click$: Observable<unknown>, login: () => Observable<S>): Observable<S> =>
  // exhaustMap: while a login is running, further clicks are ignored.
  click$.pipe(exhaustMap(() => login()))

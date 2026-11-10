import { Observable, firstValueFrom, take, toArray } from 'rxjs'

export const fromAbortable = <T>(task: (signal: AbortSignal) => Promise<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    const controller = new AbortController()
    task(controller.signal).then(
      (value) => {
        subscriber.next(value)
        subscriber.complete()
      },
      (error: unknown) => subscriber.error(error),
    )
    // After complete or error, abort() is harmless, after unsubscribe it cancels the work.
    return () => controller.abort()
  })

/** The first three prices as an array, then the function unsubscribes. */
export const firstThree = (prices$: Observable<number>): Promise<number[]> =>
  firstValueFrom(prices$.pipe(take(3), toArray()))

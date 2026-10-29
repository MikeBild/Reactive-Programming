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
    // Nach complete oder error ist abort() harmlos, nach unsubscribe bricht es die Arbeit ab.
    return () => controller.abort()
  })

/** Die ersten drei Preise als Array, danach meldet sich die Function ab. */
export const firstThree = (prices$: Observable<number>): Promise<number[]> =>
  firstValueFrom(prices$.pipe(take(3), toArray()))

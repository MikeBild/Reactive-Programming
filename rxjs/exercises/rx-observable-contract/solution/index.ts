import { Observable } from 'rxjs'

export const ticker = (ms: number, count = 5): Observable<number> =>
  new Observable<number>((subscriber) => {
    let value = 0
    const id = setInterval(() => {
      subscriber.next(value++)
      if (value === count) subscriber.complete()
    }, ms)

    // Läuft bei complete, error und unsubscribe
    return () => clearInterval(id)
  })

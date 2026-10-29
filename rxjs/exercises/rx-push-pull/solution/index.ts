import { Observable } from 'rxjs'

export type OnProduce = (value: number) => void

const noop: OnProduce = () => {}

/** Pull: Der Consumer holt jeden Wert mit next(). */
export function* countTo(max: number, onProduce: OnProduce = noop): Generator<number> {
  for (let n = 1; n <= max; n++) {
    onProduce(n)
    yield n
  }
}

/** Push: Der Producer schickt alle Werte, sobald jemand subscribe aufruft. */
export const countTo$ = (max: number, onProduce: OnProduce = noop): Observable<number> =>
  new Observable<number>((subscriber) => {
    for (let n = 1; n <= max && !subscriber.closed; n++) {
      onProduce(n)
      subscriber.next(n)
    }
    subscriber.complete()
  })

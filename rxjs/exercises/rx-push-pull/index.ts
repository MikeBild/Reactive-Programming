/**
 * Lesson rx-push-pull: Push instead of pull
 *
 * Task: Write a generator for the numbers one to ten and an
 * Observable with the same values. Compare who triggers the next
 * value in each case.
 *
 * Both producers call onProduce(n) before they hand out the value n.
 * That way the test sees when a value is created.
 */
import { Observable } from 'rxjs'

export type OnProduce = (value: number) => void

const noop: OnProduce = () => {}

/** Pull: the consumer fetches every value with next(). */
export function* countTo(max: number, onProduce: OnProduce = noop): Generator<number> {
  // TODO: Yield 1 to max. Call onProduce(n) before every yield.
  throw new Error('TODO: countTo')
}

/** Push: the producer sends all values as soon as someone calls subscribe. */
export const countTo$ = (max: number, onProduce: OnProduce = noop): Observable<number> =>
  new Observable<number>((subscriber) => {
    // TODO: Send 1 to max via subscriber.next and then report complete.
    //       Call onProduce(n) before every next.
    subscriber.error(new Error('TODO: countTo$'))
  })

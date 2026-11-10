/**
 * Lesson rx-promises-async: Promises and Observables work together
 *
 * Task: Write a function fromAbortable(task) that returns an async function
 * with AbortSignal as an Observable, and check in the test that unsubscribe
 * triggers the abort.
 *
 * Extra: fetch the first three prices as an array with firstValueFrom.
 */
import { Observable } from 'rxjs'

export const fromAbortable = <T>(task: (signal: AbortSignal) => Promise<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    // TODO: create an AbortController, start task(controller.signal),
    //       pass the result on via next and complete, errors via error,
    //       return controller.abort() as teardown
    subscriber.error(new Error('TODO: fromAbortable'))
  })

/** The first three prices as an array, then the function unsubscribes. */
export const firstThree = (prices$: Observable<number>): Promise<number[]> => {
  // TODO: firstValueFrom with take(3) and toArray
  throw new Error('TODO: firstThree')
}

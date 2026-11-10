/**
 * Lesson rx-combining: Which operator combines your streams?
 *
 * Task: Solve FizzBuzz reactively by combining the numbers one to one hundred
 * with two cyclic streams for Fizz and Buzz via zip.
 *
 * No modulo. The idea: fizz$ endlessly emits '', '', 'Fizz', '', '', 'Fizz', ...
 * and buzz$ endlessly emits '', '', '', '', 'Buzz', ... zip takes the n-th value
 * from each stream and ends as soon as the numbers end.
 *
 * Pitfall: an endless synchronous stream blocks zip. zip subscribes to
 * the sources one after another, fizz$ would fire forever before buzz$
 * is even subscribed. So schedule cycle with the asapScheduler.
 */
import { Observable } from 'rxjs'

/** Repeats the values endlessly: cycle(['a', 'b']) -> a, b, a, b, ... */
export const cycle = <T>(values: T[]): Observable<T> => {
  // TODO: scheduled(values, asapScheduler) with repeat()
  throw new Error('TODO: cycle')
}

/** FizzBuzz from 1 to max as a stream of strings. */
export const fizzBuzz$ = (max = 100): Observable<string> => {
  // TODO: range(1, max), cycle for Fizz (length 3) and Buzz (length 5), zip and map
  throw new Error('TODO: fizzBuzz$')
}

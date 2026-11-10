import { asapScheduler, map, range, repeat, scheduled, zip, type Observable } from 'rxjs'

/**
 * Repeats the values endlessly: cycle(['a', 'b']) -> a, b, a, b, ...
 * The asapScheduler makes the stream asynchronous. Synchronous and endless, it would
 * block zip, because zip could never subscribe to the remaining sources.
 */
export const cycle = <T>(values: T[]): Observable<T> => scheduled(values, asapScheduler).pipe(repeat())

/** FizzBuzz from 1 to max as a stream of strings. */
export const fizzBuzz$ = (max = 100): Observable<string> => {
  const numbers$ = range(1, max)
  const fizz$ = cycle(['', '', 'Fizz'])
  const buzz$ = cycle(['', '', '', '', 'Buzz'])

  // zip pairs the n-th value of each source and ends with the shortest one, here numbers$.
  return zip(numbers$, fizz$, buzz$).pipe(map(([n, fizz, buzz]) => fizz + buzz || String(n)))
}

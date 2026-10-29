import { asapScheduler, map, range, repeat, scheduled, zip, type Observable } from 'rxjs'

/**
 * Wiederholt die Werte endlos: cycle(['a', 'b']) -> a, b, a, b, ...
 * Der asapScheduler macht den Stream asynchron. Synchron und endlos würde er
 * zip blockieren, weil zip die übrigen Quellen nie abonnieren könnte.
 */
export const cycle = <T>(values: T[]): Observable<T> => scheduled(values, asapScheduler).pipe(repeat())

/** FizzBuzz von 1 bis max als Stream von Strings. */
export const fizzBuzz$ = (max = 100): Observable<string> => {
  const numbers$ = range(1, max)
  const fizz$ = cycle(['', '', 'Fizz'])
  const buzz$ = cycle(['', '', '', '', 'Buzz'])

  // zip paart den n-ten Wert jeder Quelle und endet mit der kürzesten, hier numbers$.
  return zip(numbers$, fizz$, buzz$).pipe(map(([n, fizz, buzz]) => fizz + buzz || String(n)))
}

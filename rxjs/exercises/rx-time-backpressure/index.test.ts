import { count, take } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { averagePer, liveValue, sensor$ } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-time-backpressure', () => {
  test('the sensor emits a thousand values per second', () => {
    createScheduler().run(({ expectObservable }) => {
      expectObservable(sensor$(1_000, (n) => n).pipe(take(1_000), count())).toBe('1000ms (a|)', { a: 1_000 })
    })
  })

  test('the sensor reads the n-th value with read(n)', () => {
    createScheduler().run(({ expectObservable }) => {
      expectObservable(sensor$(10, (n) => n * 2).pipe(take(3))).toBe('100ms a 99ms b 99ms (c|)', {
        a: 0,
        b: 2,
        c: 4,
      })
    })
  })

  test('liveValue emits only the newest value at the end of the window', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const source$ = cold('ab-c-------|', { a: 1, b: 2, c: 3 })
      expectObservable(liveValue(source$, 5)).toBe('-----c-----|', { c: 3 })
    })
  })

  test('averagePer emits the average per window and skips empty windows', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const source$ = cold('ab-c--d-e--------|', { a: 1, b: 3, c: 5, d: 10, e: 20 })
      expectObservable(averagePer(source$, 5)).toBe('-----x----y------|', { x: 3, y: 15 })
    })
  })

  test('a thousand values per second become one average per second', () => {
    createScheduler().run(({ expectObservable }) => {
      // 2,500 values in 2.5 seconds: two full windows, bufferTime delivers the rest on complete
      const averages$ = averagePer(sensor$(1_000, () => 50).pipe(take(2_500)))
      expectObservable(averages$).toBe('1000ms a 999ms a 499ms (a|)', { a: 50 })
    })
  })
})

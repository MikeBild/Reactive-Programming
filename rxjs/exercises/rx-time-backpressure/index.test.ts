import { count, take } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { describe, expect, test } from 'vitest'
import { averagePer, liveValue, sensor$ } from './index.js'

const createScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected))

describe('rx-time-backpressure', () => {
  test('der Sensor liefert tausend Werte pro Sekunde', () => {
    createScheduler().run(({ expectObservable }) => {
      expectObservable(sensor$(1_000, (n) => n).pipe(take(1_000), count())).toBe('1000ms (a|)', { a: 1_000 })
    })
  })

  test('der Sensor liest den n-ten Wert mit read(n)', () => {
    createScheduler().run(({ expectObservable }) => {
      expectObservable(sensor$(10, (n) => n * 2).pipe(take(3))).toBe('100ms a 99ms b 99ms (c|)', {
        a: 0,
        b: 2,
        c: 4,
      })
    })
  })

  test('liveValue liefert am Fensterende nur den neuesten Wert', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const source$ = cold('ab-c-------|', { a: 1, b: 2, c: 3 })
      expectObservable(liveValue(source$, 5)).toBe('-----c-----|', { c: 3 })
    })
  })

  test('averagePer liefert den Durchschnitt pro Fenster und lässt leere Fenster weg', () => {
    createScheduler().run(({ cold, expectObservable }) => {
      const source$ = cold('ab-c--d-e--------|', { a: 1, b: 3, c: 5, d: 10, e: 20 })
      expectObservable(averagePer(source$, 5)).toBe('-----x----y------|', { x: 3, y: 15 })
    })
  })

  test('aus tausend Werten pro Sekunde wird ein Durchschnitt pro Sekunde', () => {
    createScheduler().run(({ expectObservable }) => {
      // 2.500 Werte in 2,5 Sekunden: zwei volle Fenster, den Rest liefert bufferTime beim complete
      const averages$ = averagePer(sensor$(1_000, () => 50).pipe(take(2_500)))
      expectObservable(averages$).toBe('1000ms a 999ms a 499ms (a|)', { a: 50 })
    })
  })
})

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ticker } from './index.js'

// setInterval ist kein RxJS-Scheduler, deshalb läuft die Zeit hier über die Fake Timers von Vitest.
beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('rx-observable-contract', () => {
  test('ohne subscribe startet kein Timer', () => {
    ticker(1_000)
    expect(vi.getTimerCount()).toBe(0)
  })

  test('liefert fünf Werte im Takt und meldet dann complete', () => {
    const values: number[] = []
    let completed = false
    ticker(1_000).subscribe({ next: (v) => values.push(v), complete: () => (completed = true) })

    vi.advanceTimersByTime(2_000)
    expect(values).toEqual([0, 1])
    expect(completed).toBe(false)

    vi.advanceTimersByTime(3_000)
    expect(values).toEqual([0, 1, 2, 3, 4])
    expect(completed).toBe(true)
  })

  test('nach complete läuft kein Timer mehr', () => {
    ticker(1_000).subscribe()
    vi.advanceTimersByTime(10_000)
    expect(vi.getTimerCount()).toBe(0)
  })

  test('unsubscribe stoppt den Timer', () => {
    const values: number[] = []
    const subscription = ticker(1_000).subscribe((v) => values.push(v))

    vi.advanceTimersByTime(2_500)
    subscription.unsubscribe()
    vi.advanceTimersByTime(10_000)

    expect(values).toEqual([0, 1])
    expect(vi.getTimerCount()).toBe(0)
  })

  test('jeder Subscriber bekommt einen eigenen Timer', () => {
    const ticks$ = ticker(1_000)
    ticks$.subscribe()
    ticks$.subscribe()
    expect(vi.getTimerCount()).toBe(2)
  })
})

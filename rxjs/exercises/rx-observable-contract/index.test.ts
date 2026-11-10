import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ticker } from './index.js'

// setInterval is not an RxJS scheduler, so time here runs through the fake timers of Vitest.
beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('rx-observable-contract', () => {
  test('no timer starts without subscribe', () => {
    ticker(1_000)
    expect(vi.getTimerCount()).toBe(0)
  })

  test('emits five values in step and then reports complete', () => {
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

  test('after complete no timer is running anymore', () => {
    ticker(1_000).subscribe()
    vi.advanceTimersByTime(10_000)
    expect(vi.getTimerCount()).toBe(0)
  })

  test('unsubscribe stops the timer', () => {
    const values: number[] = []
    const subscription = ticker(1_000).subscribe((v) => values.push(v))

    vi.advanceTimersByTime(2_500)
    subscription.unsubscribe()
    vi.advanceTimersByTime(10_000)

    expect(values).toEqual([0, 1])
    expect(vi.getTimerCount()).toBe(0)
  })

  test('every subscriber gets its own timer', () => {
    const ticks$ = ticker(1_000)
    ticks$.subscribe()
    ticks$.subscribe()
    expect(vi.getTimerCount()).toBe(2)
  })
})

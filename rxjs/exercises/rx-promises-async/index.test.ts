import { firstValueFrom, interval, lastValueFrom, map, Subject } from 'rxjs'
import { describe, expect, test } from 'vitest'
import { firstThree, fromAbortable } from './index.js'

/** An async function that listens to the AbortSignal like fetch does. */
const slowTask = (ms: number, value: string) => (signal: AbortSignal) =>
  new Promise<string>((resolve, reject) => {
    const id = setTimeout(() => resolve(value), ms)
    signal.addEventListener('abort', () => {
      clearTimeout(id)
      reject(signal.reason)
    })
  })

describe('rx-promises-async', () => {
  test('emits the result of the task and reports complete', async () => {
    await expect(lastValueFrom(fromAbortable(slowTask(5, 'fertig')))).resolves.toBe('fertig')
  })

  test('only starts the task on subscribe', () => {
    let started = 0
    fromAbortable(async () => {
      started++
      return 1
    })
    expect(started).toBe(0)
  })

  test('unsubscribe triggers the abort', () => {
    let signal: AbortSignal | undefined
    const subscription = fromAbortable((s) => {
      signal = s
      return slowTask(1_000, 'zu spät')(s)
    }).subscribe()

    expect(signal?.aborted).toBe(false)
    subscription.unsubscribe()
    expect(signal?.aborted).toBe(true)
  })

  test('after unsubscribe neither a value nor an error arrives', async () => {
    const events: string[] = []
    const subscription = fromAbortable(slowTask(5, 'zu spät')).subscribe({
      next: (value) => events.push(value),
      error: () => events.push('error'),
    })
    subscription.unsubscribe()
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(events).toEqual([])
  })

  test('an error of the task arrives as error', async () => {
    const failing = fromAbortable(async () => {
      throw new Error('kaputt')
    })
    await expect(firstValueFrom(failing)).rejects.toThrow('kaputt')
  })

  test('firstThree fetches three prices and then unsubscribes', async () => {
    const prices = new Subject<number>()
    const result = firstThree(prices)
    prices.next(10)
    prices.next(11)
    prices.next(12)
    expect(prices.observed).toBe(false)
    await expect(result).resolves.toEqual([10, 11, 12])
  })

  test('firstThree also works with an endless source', async () => {
    await expect(firstThree(interval(1).pipe(map((n) => 100 + n)))).resolves.toEqual([100, 101, 102])
  })
})

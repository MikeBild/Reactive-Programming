import { firstValueFrom, interval, lastValueFrom, map, Subject } from 'rxjs'
import { describe, expect, test } from 'vitest'
import { firstThree, fromAbortable } from './index.js'

/** Eine async Function, die wie fetch auf das AbortSignal hört. */
const slowTask = (ms: number, value: string) => (signal: AbortSignal) =>
  new Promise<string>((resolve, reject) => {
    const id = setTimeout(() => resolve(value), ms)
    signal.addEventListener('abort', () => {
      clearTimeout(id)
      reject(signal.reason)
    })
  })

describe('rx-promises-async', () => {
  test('liefert das Ergebnis der Task und meldet complete', async () => {
    await expect(lastValueFrom(fromAbortable(slowTask(5, 'fertig')))).resolves.toBe('fertig')
  })

  test('startet die Task erst beim subscribe', () => {
    let started = 0
    fromAbortable(async () => {
      started++
      return 1
    })
    expect(started).toBe(0)
  })

  test('unsubscribe löst den Abort aus', () => {
    let signal: AbortSignal | undefined
    const subscription = fromAbortable((s) => {
      signal = s
      return slowTask(1_000, 'zu spät')(s)
    }).subscribe()

    expect(signal?.aborted).toBe(false)
    subscription.unsubscribe()
    expect(signal?.aborted).toBe(true)
  })

  test('nach unsubscribe kommt kein Wert und kein Fehler mehr an', async () => {
    const events: string[] = []
    const subscription = fromAbortable(slowTask(5, 'zu spät')).subscribe({
      next: (value) => events.push(value),
      error: () => events.push('error'),
    })
    subscription.unsubscribe()
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(events).toEqual([])
  })

  test('ein Fehler der Task kommt als error an', async () => {
    const failing = fromAbortable(async () => {
      throw new Error('kaputt')
    })
    await expect(firstValueFrom(failing)).rejects.toThrow('kaputt')
  })

  test('firstThree holt drei Preise und meldet sich dann ab', async () => {
    const prices = new Subject<number>()
    const result = firstThree(prices)
    prices.next(10)
    prices.next(11)
    prices.next(12)
    expect(prices.observed).toBe(false)
    await expect(result).resolves.toEqual([10, 11, 12])
  })

  test('firstThree funktioniert auch mit einer endlosen Quelle', async () => {
    await expect(firstThree(interval(1).pipe(map((n) => 100 + n)))).resolves.toEqual([100, 101, 102])
  })
})

import { describe, expect, test } from 'vitest'
import { countTo, countTo$ } from './index.js'

describe('rx-push-pull', () => {
  test('pull: the generator only computes when the consumer calls next()', () => {
    const produced: number[] = []
    const numbers = countTo(10, (n) => produced.push(n))

    expect(produced).toEqual([])
    expect(numbers.next()).toEqual({ value: 1, done: false })
    expect(numbers.next()).toEqual({ value: 2, done: false })
    expect(produced).toEqual([1, 2])
  })

  test('pull: the generator yields one to ten', () => {
    expect([...countTo(10)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  test('push: no value is created without subscribe', () => {
    const produced: number[] = []
    countTo$(10, (n) => produced.push(n))
    expect(produced).toEqual([])
  })

  test('push: after subscribe the producer sends all values and complete', () => {
    const received: number[] = []
    let completed = false

    countTo$(10).subscribe({
      next: (n) => received.push(n),
      complete: () => (completed = true),
    })

    expect(received).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(completed).toBe(true)
  })

  test('push: the producer sets the pace, not the consumer', () => {
    const order: string[] = []
    countTo$(3, (n) => order.push(`produziert ${n}`)).subscribe((n) => order.push(`empfangen ${n}`))

    expect(order).toEqual([
      'produziert 1',
      'empfangen 1',
      'produziert 2',
      'empfangen 2',
      'produziert 3',
      'empfangen 3',
    ])
  })
})

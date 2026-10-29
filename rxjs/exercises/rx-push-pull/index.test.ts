import { describe, expect, test } from 'vitest'
import { countTo, countTo$ } from './index.js'

describe('rx-push-pull', () => {
  test('Pull: der Generator rechnet erst, wenn der Consumer next() aufruft', () => {
    const produced: number[] = []
    const numbers = countTo(10, (n) => produced.push(n))

    expect(produced).toEqual([])
    expect(numbers.next()).toEqual({ value: 1, done: false })
    expect(numbers.next()).toEqual({ value: 2, done: false })
    expect(produced).toEqual([1, 2])
  })

  test('Pull: der Generator liefert eins bis zehn', () => {
    expect([...countTo(10)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  test('Push: ohne subscribe entsteht kein Wert', () => {
    const produced: number[] = []
    countTo$(10, (n) => produced.push(n))
    expect(produced).toEqual([])
  })

  test('Push: nach subscribe schickt der Producer alle Werte und complete', () => {
    const received: number[] = []
    let completed = false

    countTo$(10).subscribe({
      next: (n) => received.push(n),
      complete: () => (completed = true),
    })

    expect(received).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(completed).toBe(true)
  })

  test('Push: der Producer bestimmt das Tempo, nicht der Consumer', () => {
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

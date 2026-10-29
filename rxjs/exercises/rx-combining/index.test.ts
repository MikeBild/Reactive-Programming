import { lastValueFrom, take, toArray } from 'rxjs'
import { describe, expect, test } from 'vitest'
import { cycle, fizzBuzz$ } from './index.js'

const classic = (max: number) =>
  Array.from({ length: max }, (_, i) => {
    const n = i + 1
    return n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : String(n)
  })

describe('rx-combining', () => {
  test('cycle wiederholt die Werte endlos', async () => {
    await expect(lastValueFrom(cycle(['a', 'b']).pipe(take(5), toArray()))).resolves.toEqual([
      'a',
      'b',
      'a',
      'b',
      'a',
    ])
  })

  test('die ersten fünfzehn Werte', async () => {
    await expect(lastValueFrom(fizzBuzz$(15).pipe(toArray()))).resolves.toEqual([
      '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz',
    ])
  })

  test('eins bis hundert entspricht der klassischen Lösung', async () => {
    await expect(lastValueFrom(fizzBuzz$().pipe(toArray()))).resolves.toEqual(classic(100))
  })

  test('der Stream endet mit den Zahlen, obwohl Fizz und Buzz endlos sind', async () => {
    const values = await lastValueFrom(fizzBuzz$(7).pipe(toArray()))
    expect(values).toHaveLength(7)
  })
})

import { firstValueFrom, from, toArray } from 'rxjs'
import { describe, expect, test } from 'vitest'
import { features } from './index.js'

describe('rx-why', () => {
  test('rxjs is installed and runs', async () => {
    await expect(firstValueFrom(from([1, 2, 3]).pipe(toArray()))).resolves.toEqual([1, 2, 3])
  })

  test('you have noted at least three features', () => {
    expect(features.length).toBeGreaterThanOrEqual(3)
  })

  test('every feature has a name, a need, and a reason', () => {
    for (const feature of features) {
      expect(feature.name.trim()).not.toBe('')
      expect(feature.needs.length).toBeGreaterThan(0)
      expect(feature.why.trim().length).toBeGreaterThan(10)
    }
  })
})

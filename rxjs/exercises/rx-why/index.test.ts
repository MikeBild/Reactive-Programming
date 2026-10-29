import { firstValueFrom, from, toArray } from 'rxjs'
import { describe, expect, test } from 'vitest'
import { features } from './index.js'

describe('rx-why', () => {
  test('rxjs ist installiert und läuft', async () => {
    await expect(firstValueFrom(from([1, 2, 3]).pipe(toArray()))).resolves.toEqual([1, 2, 3])
  })

  test('du hast mindestens drei Features notiert', () => {
    expect(features.length).toBeGreaterThanOrEqual(3)
  })

  test('jedes Feature hat Namen, Bedarf und Begründung', () => {
    for (const feature of features) {
      expect(feature.name.trim()).not.toBe('')
      expect(feature.needs.length).toBeGreaterThan(0)
      expect(feature.why.trim().length).toBeGreaterThan(10)
    }
  })
})

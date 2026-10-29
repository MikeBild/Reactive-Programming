import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mountComponent } from './index.js'

// interval läuft über den asyncScheduler und damit über setInterval.
// Die Fake Timers von Vitest stellen die Uhr vor, ohne echte Zeit zu warten.
beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('rx-subscription-cleanup', () => {
  test('die Komponente reagiert auf Uhr, Autosave und resize', () => {
    const window = new EventTarget()
    const lines: string[] = []
    mountComponent(window, (line) => lines.push(line))

    vi.advanceTimersByTime(4_000)
    expect(lines).toEqual(['tick 0', 'tick 1', 'tick 2', 'tick 3'])

    vi.advanceTimersByTime(1_000)
    expect(lines).toContain('tick 4')
    expect(lines).toContain('autosave 0')

    window.dispatchEvent(new Event('resize'))
    expect(lines.at(-1)).toBe('resize')
  })

  test('destroy beendet alle drei Subscriptions', () => {
    const window = new EventTarget()
    const lines: string[] = []
    const component = mountComponent(window, (line) => lines.push(line))

    vi.advanceTimersByTime(1_500)
    component.destroy()

    expect(lines).toEqual(['tick 0', 'tick gestoppt', 'autosave gestoppt', 'resize gestoppt'])
  })

  test('nach destroy läuft kein Timer und kein Listener mehr', () => {
    const window = new EventTarget()
    const lines: string[] = []
    const component = mountComponent(window, (line) => lines.push(line))

    component.destroy()
    lines.length = 0

    vi.advanceTimersByTime(60_000)
    window.dispatchEvent(new Event('resize'))

    expect(lines).toEqual([])
    expect(vi.getTimerCount()).toBe(0)
  })
})

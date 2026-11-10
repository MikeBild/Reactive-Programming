import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mountComponent } from './index.js'

// interval runs through the asyncScheduler and therefore through setInterval.
// The fake timers of Vitest advance the clock without waiting real time.
beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('rx-subscription-cleanup', () => {
  test('the component reacts to clock, autosave, and resize', () => {
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

  test('destroy ends all three subscriptions', () => {
    const window = new EventTarget()
    const lines: string[] = []
    const component = mountComponent(window, (line) => lines.push(line))

    vi.advanceTimersByTime(1_500)
    component.destroy()

    expect(lines).toEqual(['tick 0', 'tick gestoppt', 'autosave gestoppt', 'resize gestoppt'])
  })

  test('after destroy no timer and no listener is running anymore', () => {
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

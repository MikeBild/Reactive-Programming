/**
 * Lesson rx-subscription-cleanup: Every subscription needs an end
 *
 * Task: Build a component with three subscriptions to interval and
 * fromEvent, and end all of them via a shared destroy$ signal with takeUntil.
 *
 * The component gets a window (EventTarget) and a render function.
 * - Clock:    interval(1_000)  -> render('tick 0'), render('tick 1'), ...
 * - Autosave: interval(5_000)  -> render('autosave 0'), ...
 * - Layout:   fromEvent(window, 'resize') -> render('resize')
 * Every subscription reports on cleanup via finalize render('<name> gestoppt'),
 * so 'tick gestoppt', 'autosave gestoppt', and 'resize gestoppt'.
 * destroy() ends all three at once.
 */

export type Component = { destroy: () => void }

export const mountComponent = (window: EventTarget, render: (line: string) => void): Component => {
  // TODO: const destroy$ = new Subject<void>()
  // TODO: three subscriptions with finalize(...) and takeUntil(destroy$) as the last operator
  // TODO: destroy() calls destroy$.next() and destroy$.complete()
  throw new Error('TODO: mountComponent')
}

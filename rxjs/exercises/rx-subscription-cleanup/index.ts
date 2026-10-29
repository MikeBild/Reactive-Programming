/**
 * Lektion rx-subscription-cleanup: Jede Subscription braucht ein Ende
 *
 * Aufgabe: Bau eine Komponente mit drei Subscriptions auf interval und
 * fromEvent und beende alle über ein gemeinsames destroy$-Signal mit takeUntil.
 *
 * Die Komponente bekommt ein window (EventTarget) und eine render-Function.
 * - Uhr:      interval(1_000)  -> render('tick 0'), render('tick 1'), ...
 * - Autosave: interval(5_000)  -> render('autosave 0'), ...
 * - Layout:   fromEvent(window, 'resize') -> render('resize')
 * Jede Subscription meldet beim Aufräumen per finalize render('<name> gestoppt'),
 * also 'tick gestoppt', 'autosave gestoppt' und 'resize gestoppt'.
 * destroy() beendet alle drei auf einmal.
 */

export type Component = { destroy: () => void }

export const mountComponent = (window: EventTarget, render: (line: string) => void): Component => {
  // TODO: const destroy$ = new Subject<void>()
  // TODO: drei Subscriptions mit finalize(...) und takeUntil(destroy$) als letztem Operator
  // TODO: destroy() ruft destroy$.next() und destroy$.complete() auf
  throw new Error('TODO: mountComponent')
}

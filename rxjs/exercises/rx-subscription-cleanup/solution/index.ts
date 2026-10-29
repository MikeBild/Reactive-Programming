import { Subject, finalize, fromEvent, interval, map, takeUntil } from 'rxjs'

export type Component = { destroy: () => void }

export const mountComponent = (window: EventTarget, render: (line: string) => void): Component => {
  const destroy$ = new Subject<void>()

  // takeUntil steht als letzter Operator, damit es alles davor beendet.
  interval(1_000)
    .pipe(
      map((n) => `tick ${n}`),
      finalize(() => render('tick gestoppt')),
      takeUntil(destroy$),
    )
    .subscribe(render)

  interval(5_000)
    .pipe(
      map((n) => `autosave ${n}`),
      finalize(() => render('autosave gestoppt')),
      takeUntil(destroy$),
    )
    .subscribe(render)

  fromEvent(window, 'resize')
    .pipe(
      map(() => 'resize'),
      finalize(() => render('resize gestoppt')),
      takeUntil(destroy$),
    )
    .subscribe(render)

  return {
    destroy: () => {
      destroy$.next()
      destroy$.complete()
    },
  }
}

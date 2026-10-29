// Startet deinen log$ für drei Sekunden: node exercises/rx-creation/demo.ts
// Mit RX_TARGET=solution läuft die Lösung.
import { take, takeUntil, timer } from 'rxjs'

const { log$ } = (process.env.RX_TARGET === 'solution'
  ? await import('./solution/index.ts')
  : await import('./index.ts')) as typeof import('./index.ts')

const button = new EventTarget()
const loadUser = () =>
  new Promise<{ id: string; name: string }>((resolve) => setTimeout(() => resolve({ id: '42', name: 'Ada' }), 500))

log$(button, 1_000, loadUser)
  .pipe(takeUntil(timer(3_100)))
  .subscribe((line) => console.log(line))

timer(1_500, 700)
  .pipe(take(2))
  .subscribe(() => button.dispatchEvent(new Event('click')))

// Zeigt drei Sekunden lang Live-Wert und Durchschnitt: node exercises/rx-time-backpressure/demo.ts
// Mit RX_TARGET=solution läuft die Lösung.
import { share, takeUntil, timer } from 'rxjs'

const { averagePer, liveValue, sensor$ } = (process.env.RX_TARGET === 'solution'
  ? await import('./solution/index.ts')
  : await import('./index.ts')) as typeof import('./index.ts')

const sensor = sensor$().pipe(takeUntil(timer(3_050)), share())

liveValue(sensor, 250).subscribe((value) => console.log(`live    ${value.toFixed(1)}`))
averagePer(sensor).subscribe((value) => console.log(`schnitt ${value.toFixed(1)}`))

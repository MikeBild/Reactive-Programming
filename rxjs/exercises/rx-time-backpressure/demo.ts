// Shows live value and average for three seconds: node exercises/rx-time-backpressure/demo.ts
// With RX_TARGET=solution the reference solution runs.
import { share, takeUntil, timer } from 'rxjs'

const { averagePer, liveValue, sensor$ } = (process.env.RX_TARGET === 'solution'
  ? await import('./solution/index.ts')
  : await import('./index.ts')) as typeof import('./index.ts')

const sensor = sensor$().pipe(takeUntil(timer(3_050)), share())

liveValue(sensor, 250).subscribe((value) => console.log(`live    ${value.toFixed(1)}`))
averagePer(sensor).subscribe((value) => console.log(`schnitt ${value.toFixed(1)}`))

*English · [Deutsch](README.de.md)*

# Exercises: Reactive programming with RxJS

Exercise repo for the workshop “Reactive programming with RxJS”. Every lesson has an exercise with a starting point, tests, and a reference solution. In the later exercises, a small workshop shop with product search and cart is the running example.

## What you learn

- Create and share Observables, and end every subscription cleanly
- Process and combine streams with operators, and catch errors
- Test time-dependent code with the `TestScheduler` without real waiting

## Prerequisites

- **Node.js 26** – `nvm use` in the `rxjs/` folder reads the version from [`rxjs/.nvmrc`](rxjs/.nvmrc).
- An editor with TypeScript support

## Setup

```sh
git clone https://github.com/MikeBild/Reactive-Programming.git
cd Reactive-Programming/rxjs
nvm use
npm ci
npm run check
```

`npm run check` checks the types and runs all tests against the reference solutions. After that, everything is green.

## How to work on an exercise

Every exercise lives in `rxjs/exercises/<lesson>/`. The starting point `index.ts` contains the task and `TODO` comments, `index.test.ts` checks your code, and `solution/` holds the reference solution for comparison. All commands run in the `rxjs/` folder. How to run the tests, why they are red at first, and how solution mode works is described in [`rxjs/README.md`](rxjs/README.md).

## Exercises

The order follows the agenda of the workshop.

| Lesson | ID | Task |
| --- | --- | --- |
| When is reactive programming worth it? | [`rx-why`](rxjs/exercises/rx-why) | The project is set up. Note three features from your project where values arrive over time. |
| Push instead of pull | [`rx-push-pull`](rxjs/exercises/rx-push-pull) | Generator and Observable for one to ten. Who triggers the next value? |
| Nothing happens without subscribe | [`rx-observable-contract`](rxjs/exercises/rx-observable-contract) | `ticker(ms)` with `setInterval`, complete after five values, teardown stops the timer. |
| Almost everything becomes an Observable | [`rx-creation`](rxjs/exercises/rx-creation) | Clicks, timer, and Promise as Observables, logged together with a prefix. Demo: `node exercises/rx-creation/demo.ts` |
| Operators are functions in a pipe | [`rx-operators-pipe`](rxjs/exercises/rx-operators-pipe) | Message processing: your own operators `ofType` and `countOfType` with `filter`, `distinctUntilChanged`, and `scan`. |
| Every subscription needs an end | [`rx-subscription-cleanup`](rxjs/exercises/rx-subscription-cleanup) | Three subscriptions, one `destroy$`, `takeUntil`, and `finalize`. |
| Which operator combines your streams? | [`rx-combining`](rxjs/exercises/rx-combining) | FizzBuzz without modulo: numbers and two cyclic streams via `zip`. |
| Cold or hot, who starts the producer? | [`rx-cold-hot`](rxjs/exercises/rx-cold-hot) | Two subscribers, two requests. With `share`, only one. |
| Promises and Observables work together | [`rx-promises-async`](rxjs/exercises/rx-promises-async) | `fromAbortable(task)`: unsubscribe triggers the abort. Plus `firstValueFrom`. |
| switchMap, mergeMap, concatMap, or exhaustMap? | [`rx-flattening`](rxjs/exercises/rx-flattening) | Search, autosave, upload queue, and login with `switchMap`, `concatMap`, `mergeMap`, and `exhaustMap`, each choice justified. |
| An error ends the stream | [`rx-error-handling`](rxjs/exercises/rx-error-handling) | Three URLs with `mergeMap`, `timeout`, `retry` with backoff, and an error value via `catchError`. |
| Subjects share values, share shares work | [`rx-subjects-multicasting`](rxjs/exercises/rx-subjects-multicasting) | The last one turns off the light: one WebSocket connection with `share` and ref counting. Plus a `CartStore` with `BehaviorSubject`. |
| What if more events arrive than you can process? | [`rx-time-backpressure`](rxjs/exercises/rx-time-backpressure) | A sensor with a thousand values per second, live value via `auditTime`, average via `bufferTime`. Demo: `node exercises/rx-time-backpressure/demo.ts` |
| Testing time without waiting | [`rx-marble-testing`](rxjs/exercises/rx-marble-testing) | Here you write the tests yourself with `node:test`, `node:assert`, and `TestScheduler`: `interval` without mocks and the product search from `search.ts` with marble diagrams. The starting point is `search.test.ts` with `test.todo`, run it with `npm run test:marble`. |

### Extra chapters

| Lesson | ID | Task |
| --- | --- | --- |
| UI state as a stream of Actions | [`rx-ui-state`](rxjs/exercises/rx-ui-state) | Cart view model for the workshop shop: actions and `scan`, derived `totalCents$` and `canPlace$`, plus the last five searches as an LRU list. |
| Signals or Observables? | [`rx-signals-interop`](rxjs/exercises/rx-signals-interop) | Cart and total as a Signal, product search with `debounceTime` and `switchMap` as an Observable, plus the bridges `toObservable` and `toSignal`. |

## Workshop and slides

- Workshop: [“Reactive programming with RxJS”](https://workshops.mikebild.dev/w/reactive-programming/remote/)
- Slides: [slides.mikebild.dev/introduction-reactive-programming](https://slides.mikebild.dev/introduction-reactive-programming.html)
- PDF: [slides.mikebild.dev/introduction-reactive-programming.pdf](https://slides.mikebild.dev/introduction-reactive-programming.pdf)

## Archive

The earlier material with C# and Rx.NET is kept unchanged in [`Examples/`](Examples), together with the earlier slide deck (`Reactive-Programming.pptx`, `Reactive-Programming.pdf`) and the overview diagram `overwiew.drawio`.

## License

[MIT](LICENSE)

*English · [Deutsch](README.de.md)*

# Guide to the RxJS exercises

This is how you work with the exercises: commands, structure of an exercise, marble tests, and solution mode. Prerequisites, setup, and the list of exercises are in the [repo README](../README.md). All commands run in this folder.

## Stack

TypeScript in strict mode, ESM, RxJS 7.8, and Vitest. Time-dependent tests run with the `TestScheduler` from `rxjs/testing` on virtual time. The lesson `rx-marble-testing` uses the built-in test runner of Node (`node:test` and `node:assert`) instead of Vitest, just as the lesson shows it.

## How to work on an exercise

1. Open `exercises/<lesson>/index.ts`. The task is at the top, `TODO` comments in the code mark the gaps.
2. Start the tests of the lesson in watch mode, for example `npx vitest rx-push-pull`.
3. Fill the gaps until all tests are green.
4. If you get stuck, look into `exercises/<lesson>/solution/`.

**Red tests are intended at the start.** The starting points throw `TODO` errors, so `npm test` and `npx vitest run` fail as long as you have not filled the gaps. A few tests are green already, such as “no timer starts without subscribe”: that is also true for an empty starting point. Vitest also reports “Unhandled Errors” because the starting points report their `TODO` errors via `subscriber.error`. That disappears with your solution as well.

The tests are the same for the starting point and the reference solution. `npm run test:solution` runs them against the reference solutions, where everything is green.

| Command | What happens |
| --- | --- |
| `npm test` | Marble tests (`node --test`) and all Vitest tests against your starting points |
| `npm run test:marble` | Only your marble tests from `rx-marble-testing` with `node --test` |
| `npm run test:marble:solution` | The marble tests of the reference solution |
| `npx vitest rx-flattening` | Watch mode for one lesson |
| `npm run test:solution` | All tests against the reference solutions, including marble tests |
| `npm run typecheck` | `tsc --noEmit` over starting points, reference solutions, and tests |
| `npm run check` | Type check and solution tests, for example before a commit |

## Structure of an exercise

```text
exercises/rx-flattening/
├── index.ts            starting point with task and TODOs
├── index.test.ts       tests, run against index.ts or the reference solution
└── solution/
    └── index.ts        reference solution with the reasoning in the comment
```

Some exercises have helper files you do not need to change, such as `fake-socket.ts` or `signal.ts`. In `rx-marble-testing` the task is the test itself: the reference solution is in `solution/search.test.ts`.

## Marble tests with node:test

`rx-marble-testing` needs no test framework. Node.js 26 runs TypeScript files directly and ships a test runner with `node:test`. The `TestScheduler` gets `deepStrictEqual` from `node:assert/strict` as its comparison.

```sh
npm run test:marble                                            # your tests, open test.todo entries are reported as todo
node --test --watch exercises/rx-marble-testing/search.test.ts # watch mode
npm run test:marble:solution                                   # the reference solution
```

Because Node.js loads the file without a bundler, you import local modules with the `.ts` extension, such as `import { searchResults } from './search.ts'`. Vitest ignores this folder.

## Testing without mocks

All services come in as parameters, not as imports. In the test, a `cold` or `hot` Observable from the `TestScheduler` or a small fake function replaces them. You do not need a mock library.

The other lessons stay with Vitest: they do not teach a particular test tool, the tests are only there to check your work. Vitest provides the solution mode below without a custom loader, and the fake timers that two lessons need: `rx-observable-contract` deliberately builds on `setInterval` rather than an RxJS scheduler, and `rx-subscription-cleanup` checks that no timer is still running after `destroy`.

## How solution mode works

The tests always import `./index.js`. With `RX_TARGET=solution`, a small plugin in `vitest.config.ts` redirects this import to `./solution/index.ts`. That way tests, starting point, and reference solution stay in one folder and you can compare them directly.

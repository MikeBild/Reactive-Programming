/**
 * Lektion rx-observable-contract: Ohne subscribe passiert nichts
 *
 * Aufgabe: Schreib ein Observable ticker(ms), das mit setInterval hochzählt,
 * nach fünf Werten complete meldet und beim unsubscribe den Timer stoppt.
 *
 * Der Vertrag: next beliebig oft, danach höchstens einmal error oder complete.
 * Die Teardown-Function, die du zurückgibst, räumt auf.
 */
import { Observable } from 'rxjs'

export const ticker = (ms: number, count = 5): Observable<number> =>
  new Observable<number>((subscriber) => {
    // TODO: setInterval starten, 0, 1, 2, ... senden, nach count Werten complete melden
    // TODO: eine Teardown-Function zurückgeben, die clearInterval aufruft
  })

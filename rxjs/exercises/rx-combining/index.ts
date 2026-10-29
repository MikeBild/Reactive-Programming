/**
 * Lektion rx-combining: Welcher Operator kombiniert deine Streams?
 *
 * Aufgabe: Löse FizzBuzz reaktiv, indem du die Zahlen eins bis hundert mit
 * zwei zyklischen Streams für Fizz und Buzz per zip kombinierst.
 *
 * Kein Modulo! Die Idee: fizz$ liefert endlos '', '', 'Fizz', '', '', 'Fizz', ...
 * und buzz$ liefert endlos '', '', '', '', 'Buzz', ... zip nimmt von jedem
 * Stream den n-ten Wert und endet, sobald die Zahlen enden.
 *
 * Stolperfalle: Ein endloser synchroner Stream blockiert zip. zip abonniert
 * die Quellen nacheinander, fizz$ würde für immer feuern, bevor buzz$
 * überhaupt abonniert ist. Plane cycle deshalb mit dem asapScheduler.
 */
import { Observable } from 'rxjs'

/** Wiederholt die Werte endlos: cycle(['a', 'b']) -> a, b, a, b, ... */
export const cycle = <T>(values: T[]): Observable<T> => {
  // TODO: scheduled(values, asapScheduler) mit repeat()
  throw new Error('TODO: cycle')
}

/** FizzBuzz von 1 bis max als Stream von Strings. */
export const fizzBuzz$ = (max = 100): Observable<string> => {
  // TODO: range(1, max), cycle für Fizz (Länge 3) und Buzz (Länge 5), zip und map
  throw new Error('TODO: fizzBuzz$')
}

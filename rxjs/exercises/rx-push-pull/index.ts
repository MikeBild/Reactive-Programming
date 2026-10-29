/**
 * Lektion rx-push-pull: Push statt Pull
 *
 * Aufgabe: Schreib einen Generator für die Zahlen eins bis zehn und ein
 * Observable mit denselben Werten. Vergleiche, wer jeweils den nächsten Wert
 * anstößt.
 *
 * Beide Producer rufen onProduce(n) auf, bevor sie den Wert n herausgeben.
 * So sieht der Test, wann ein Wert entsteht.
 */
import { Observable } from 'rxjs'

export type OnProduce = (value: number) => void

const noop: OnProduce = () => {}

/** Pull: Der Consumer holt jeden Wert mit next(). */
export function* countTo(max: number, onProduce: OnProduce = noop): Generator<number> {
  // TODO: Liefere 1 bis max. Ruf vor jedem yield onProduce(n) auf.
  throw new Error('TODO: countTo')
}

/** Push: Der Producer schickt alle Werte, sobald jemand subscribe aufruft. */
export const countTo$ = (max: number, onProduce: OnProduce = noop): Observable<number> =>
  new Observable<number>((subscriber) => {
    // TODO: Schick 1 bis max per subscriber.next und melde danach complete.
    //       Ruf vor jedem next onProduce(n) auf.
    subscriber.error(new Error('TODO: countTo$'))
  })

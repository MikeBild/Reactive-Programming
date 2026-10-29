/**
 * Lektion rx-cold-hot: Cold oder Hot, wer startet den Producer?
 *
 * Aufgabe: Abonniere ein defer-fetch-Observable zweimal, zähle die Requests
 * mit tap und teile die Ausführung danach mit share, sodass nur ein Request läuft.
 *
 * Statt fetch bekommst du loadUser übergeben, onRequest zählt mit.
 * Schritt 1: coldUser$ fertig machen und im Test sehen, dass zwei Requests laufen.
 * Schritt 2: sharedUser$ so bauen, dass zwei Subscriber nur einen Request auslösen.
 */
import { Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Cold: jeder subscribe startet einen eigenen Request. */
export const coldUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> => {
  // TODO: defer(() => loadUser()) und onRequest per tap aufrufen
  throw new Error('TODO: coldUser$')
}

/** Hot: alle gleichzeitigen Subscriber teilen sich einen Request. */
export const sharedUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> => {
  // TODO: coldUser$ wiederverwenden und mit share teilen
  throw new Error('TODO: sharedUser$')
}

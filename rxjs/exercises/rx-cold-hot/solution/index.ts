import { defer, share, tap, type Observable } from 'rxjs'

export type User = { id: string; name: string }

/** Cold: jeder subscribe startet einen eigenen Request. */
export const coldUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> =>
  defer(() => loadUser()).pipe(tap(() => onRequest()))

/** Hot: alle gleichzeitigen Subscriber teilen sich einen Request. */
export const sharedUser$ = (loadUser: () => Promise<User>, onRequest: () => void): Observable<User> =>
  coldUser$(loadUser, onRequest).pipe(share())

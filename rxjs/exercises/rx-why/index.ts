/**
 * Lektion rx-why: Wann lohnt sich reaktive Programmierung?
 *
 * Aufgabe: Schreib drei Features aus deinem Projekt auf, bei denen Werte über
 * die Zeit eintreffen. Prüf für jedes Feature mit der Checkliste aus dem
 * Handout, was den Stream ausmacht.
 *
 * Das Projekt drumherum (TypeScript strict, ESM, rxjs 7.8) steht schon:
 * schau dir package.json und tsconfig.json an.
 */

export type Source = 'ui' | 'websocket' | 'sse' | 'polling' | 'queue' | 'timer' | 'other'

export type Need = 'combine' | 'cancel' | 'throttle' | 'buffer' | 'retry'

export type StreamFeature = {
  /** Wie heißt das Feature in deinem Projekt? */
  name: string
  /** Woher kommen die Werte? */
  source: Source
  /** Was musst du mit den Werten tun? Mindestens ein Eintrag. */
  needs: Need[]
  /** Ein Satz: Warum reicht async await hier nicht? */
  why: string
}

// TODO: Trag drei Features aus deinem Projekt ein.
export const features: StreamFeature[] = []

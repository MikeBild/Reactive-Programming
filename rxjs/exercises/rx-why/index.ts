/**
 * Lesson rx-why: When is reactive programming worth it?
 *
 * Task: Write down three features from your project where values arrive
 * over time. For every feature, check with the checklist from the
 * handout what makes it a stream.
 *
 * The project around it (TypeScript strict, ESM, rxjs 7.8) is already set up:
 * take a look at package.json and tsconfig.json.
 */

export type Source = 'ui' | 'websocket' | 'sse' | 'polling' | 'queue' | 'timer' | 'other'

export type Need = 'combine' | 'cancel' | 'throttle' | 'buffer' | 'retry'

export type StreamFeature = {
  /** What is the feature called in your project? */
  name: string
  /** Where do the values come from? */
  source: Source
  /** What do you have to do with the values? At least one entry. */
  needs: Need[]
  /** One sentence: why is async await not enough here? */
  why: string
}

// TODO: Enter three features from your project.
export const features: StreamFeature[] = []

/**
 * Example solution for rx-why. Your features will look different,
 * what matters is that you can explain for each one why it is a stream.
 */

export type Source = 'ui' | 'websocket' | 'sse' | 'polling' | 'queue' | 'timer' | 'other'

export type Need = 'combine' | 'cancel' | 'throttle' | 'buffer' | 'retry'

export type StreamFeature = {
  name: string
  source: Source
  needs: Need[]
  why: string
}

export const features: StreamFeature[] = [
  {
    name: 'Produktsuche während der Eingabe',
    source: 'ui',
    needs: ['throttle', 'cancel'],
    why: 'Jeder Tastendruck ist ein neuer Wert, veraltete Requests müssen abgebrochen werden.',
  },
  {
    name: 'Live-Kurse im Dashboard',
    source: 'websocket',
    needs: ['combine', 'throttle', 'retry'],
    why: 'Der Server schickt laufend Kurse, die UI soll sie gedrosselt mit den Filtern kombinieren.',
  },
  {
    name: 'Status eines Exports abfragen',
    source: 'polling',
    needs: ['cancel', 'retry'],
    why: 'Bis der Export fertig ist, kommen viele Antworten, beim Verlassen der Seite soll das Polling enden.',
  },
]

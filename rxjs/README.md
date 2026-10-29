# Reactive Programming mit RxJS: Übungen

Die Übungen zum Workshop „Reactive Programming mit RxJS“. Zu jeder Lektion gibt es einen Ordner unter `exercises/` mit Startpunkt, Lösung und Tests.

## Voraussetzungen

- Node.js 26 (`node -v`)
- Ein Editor mit TypeScript-Unterstützung

Der Stack: TypeScript im strict-Modus, ESM, RxJS 7.8 und Vitest. Zeitabhängige Tests laufen mit dem `TestScheduler` aus `rxjs/testing` auf virtueller Zeit. Die Lektion `rx-marble-testing` nutzt statt Vitest den eingebauten Test-Runner von Node (`node:test` und `node:assert`), so wie die Lektion es zeigt.

```sh
cd rxjs
npm ci
npm run typecheck
npm test
```

## So arbeitest du

1. Öffne `exercises/<lektion>/index.ts`. Oben steht die Aufgabe, im Code markieren `TODO`-Kommentare die Lücken.
2. Starte die Tests der Lektion im Watch-Modus, zum Beispiel `npx vitest rx-push-pull`.
3. Füll die Lücken, bis alle Tests grün sind.
4. Hängst du fest, schau in `exercises/<lektion>/solution/`.

**Rote Tests sind am Anfang gewollt.** Die Startpunkte werfen `TODO`-Fehler, deshalb schlagen `npm test` und `npx vitest run` fehl, solange du die Lücken nicht gefüllt hast. Ein paar Tests sind schon grün, etwa „ohne subscribe passiert nichts“: Das stimmt auch für einen leeren Startpunkt. Vitest meldet außerdem „Unhandled Errors“, weil die Startpunkte ihre `TODO`-Fehler per `subscriber.error` melden. Auch das verschwindet mit deiner Lösung.

Die Tests sind für Startpunkt und Lösung dieselben. `npm run test:solution` lässt sie gegen die Lösungen laufen, dort ist alles grün.

| Befehl | Was passiert |
| --- | --- |
| `npm test` | Marble Tests (`node --test`) und alle Vitest-Tests gegen deine Startpunkte |
| `npm run test:marble` | Nur deine Marble Tests aus `rx-marble-testing` mit `node --test` |
| `npm run test:marble:solution` | Die Marble Tests der Lösung |
| `npx vitest rx-flattening` | Watch-Modus für eine Lektion |
| `npm run test:solution` | Alle Tests gegen die Lösungen, inklusive Marble Tests |
| `npm run typecheck` | `tsc --noEmit` über Startpunkte, Lösungen und Tests |
| `npm run check` | Typecheck und Lösungs-Tests, zum Beispiel vor einem Commit |

## Lektionen

Die Reihenfolge folgt der Agenda des Workshops.

| Lektion | Ordner | Aufgabe |
| --- | --- | --- |
| Wann lohnt sich reaktive Programmierung? | [`exercises/rx-why`](exercises/rx-why) | Das Projekt steht. Notier drei Features aus deinem Projekt, bei denen Werte über die Zeit eintreffen. |
| Push statt Pull | [`exercises/rx-push-pull`](exercises/rx-push-pull) | Generator und Observable für eins bis zehn. Wer stößt den nächsten Wert an? |
| Ohne subscribe passiert nichts | [`exercises/rx-observable-contract`](exercises/rx-observable-contract) | `ticker(ms)` mit `setInterval`, complete nach fünf Werten, Teardown stoppt den Timer. |
| Fast alles wird zum Observable | [`exercises/rx-creation`](exercises/rx-creation) | Klicks, Timer und Promise als Observables, zusammen geloggt mit Präfix. Demo: `node exercises/rx-creation/demo.ts` |
| Cold oder Hot | [`exercises/rx-cold-hot`](exercises/rx-cold-hot) | Zwei Subscriber, zwei Requests. Mit `share` nur noch einer. |
| Jede Subscription braucht ein Ende | [`exercises/rx-subscription-cleanup`](exercises/rx-subscription-cleanup) | Drei Subscriptions, ein `destroy$`, `takeUntil` und `finalize`. |
| Operatoren in einer pipe | [`exercises/rx-operators-pipe`](exercises/rx-operators-pipe) | Message Processing: eigene Operatoren `ofType` und `countOfType` mit `filter`, `distinctUntilChanged` und `scan`. |
| Streams kombinieren | [`exercises/rx-combining`](exercises/rx-combining) | FizzBuzz ohne Modulo: Zahlen und zwei zyklische Streams per `zip`. |
| Promises und Observables | [`exercises/rx-promises-async`](exercises/rx-promises-async) | `fromAbortable(task)`: unsubscribe löst den Abort aus. Dazu `firstValueFrom`. |
| Flattening | [`exercises/rx-flattening`](exercises/rx-flattening) | Suche, Autosave, Upload-Queue und Login mit `switchMap`, `concatMap`, `mergeMap` und `exhaustMap`, jede Wahl begründet. |
| Fehlerbehandlung | [`exercises/rx-error-handling`](exercises/rx-error-handling) | Drei URLs mit `mergeMap`, `timeout`, `retry` mit Backoff und Fehlerwert per `catchError`. |
| Subjects und Multicasting | [`exercises/rx-subjects-multicasting`](exercises/rx-subjects-multicasting) | Der Letzte macht das Licht aus: eine WebSocket-Verbindung mit `share` und Ref Counting. Dazu ein `CartStore` mit `BehaviorSubject`. |
| Zeit und Backpressure | [`exercises/rx-time-backpressure`](exercises/rx-time-backpressure) | Sensor mit tausend Werten pro Sekunde, Live-Wert per `auditTime`, Durchschnitt per `bufferTime`. Demo: `node exercises/rx-time-backpressure/demo.ts` |
| Marble Testing | [`exercises/rx-marble-testing`](exercises/rx-marble-testing) | Hier schreibst du die Tests mit `node:test`, `node:assert` und `TestScheduler`: `interval` ohne Mocks und die Produktsuche aus `search.ts` mit Marble-Diagrammen. Startpunkt ist `search.test.ts` mit `test.todo`, Start mit `npm run test:marble`. |
| UI-Zustand als Stream | [`exercises/rx-ui-state`](exercises/rx-ui-state) | Warenkorb-View-Model für den Werkstatt-Shop: Aktionen und `scan`, abgeleitet `totalCents$` und `canPlace$`, dazu die letzten fünf Suchen als LRU-Liste. |
| Signals und Observables | [`exercises/rx-signals-interop`](exercises/rx-signals-interop) | Warenkorb und Gesamtsumme als Signal, Produktsuche mit `debounceTime` und `switchMap` als Observable, dazu die Brücken `toObservable` und `toSignal`. |

## Aufbau einer Lektion

```text
exercises/rx-flattening/
├── index.ts            Startpunkt mit Aufgabe und TODOs
├── index.test.ts       Tests, laufen gegen index.ts oder die Lösung
└── solution/
    └── index.ts        Lösung mit Begründung im Kommentar
```

Manche Lektionen haben Hilfsdateien, die du nicht ändern musst, etwa `fake-socket.ts` oder `signal.ts`. Bei `rx-marble-testing` ist die Aufgabe der Test selbst: Die Lösung liegt in `solution/search.test.ts`.

## Marble Tests mit node:test

`rx-marble-testing` braucht kein Test-Framework. Node 26 führt TypeScript-Dateien direkt aus und bringt mit `node:test` einen Test-Runner mit. Der `TestScheduler` bekommt `deepStrictEqual` aus `node:assert/strict` als Vergleich.

```sh
npm run test:marble                                            # deine Tests, offene test.todo werden als todo gemeldet
node --test --watch exercises/rx-marble-testing/search.test.ts # Watch-Modus
npm run test:marble:solution                                   # die Lösung
```

Weil Node die Datei ohne Bundler lädt, importierst du lokale Module mit Endung `.ts`, etwa `import { searchResults } from './search.ts'`. Vitest ignoriert diesen Ordner.

## Testen ohne Mocks

Alle Services kommen als Parameter rein, nicht als Import. Im Test ersetzt sie ein `cold` oder `hot` Observable aus dem `TestScheduler` oder eine kleine Fake-Function. Eine Mock-Library brauchst du nicht.

Die übrigen Lektionen bleiben bei Vitest: Sie lehren kein bestimmtes Test-Werkzeug, die Tests sind dort nur Prüfhilfe. Vitest liefert den Lösungsmodus unten ohne eigenen Loader und die Fake Timers, die zwei Lektionen brauchen: `rx-observable-contract` baut bewusst auf `setInterval` und nicht auf einem RxJS-Scheduler auf, und `rx-subscription-cleanup` prüft, dass nach `destroy` kein Timer mehr läuft.

## Wie der Lösungsmodus funktioniert

Die Tests importieren immer `./index.js`. Mit `RX_TARGET=solution` biegt ein kleines Plugin in `vitest.config.ts` diesen Import auf `./solution/index.ts` um. So bleiben Tests, Startpunkt und Lösung in einem Ordner und du kannst sie direkt vergleichen.

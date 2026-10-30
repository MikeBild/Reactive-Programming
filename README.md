# Übungen: Reactive Programming mit RxJS

Übungs-Repo zum Workshop „Reactive Programming mit RxJS“. Zu jeder Lektion gibt es eine Übung mit Startpunkt, Tests und Lösung. In den späteren Übungen ist ein kleiner Werkstatt-Shop mit Produktsuche und Warenkorb das durchgehende Beispiel.

## Was du lernst

- Observables erzeugen, teilen und jede Subscription sauber beenden
- Streams mit Operatoren verarbeiten, kombinieren und Fehler abfangen
- Zeitabhängigen Code mit dem `TestScheduler` ohne echtes Warten testen

## Voraussetzungen

- **Node.js 26** – `nvm use` im Ordner `rxjs/` liest die Version aus [`rxjs/.nvmrc`](rxjs/.nvmrc).
- Ein Editor mit TypeScript-Unterstützung

## Einrichten

```sh
git clone https://github.com/MikeBild/Reactive-Programming.git
cd Reactive-Programming/rxjs
nvm use
npm ci
npm run check
```

`npm run check` prüft die Typen und lässt alle Tests gegen die Lösungen laufen. Danach ist alles grün.

## So arbeitest du mit einer Übung

Jede Übung liegt in `rxjs/exercises/<lektion>/`. Der Startpunkt `index.ts` enthält die Aufgabe und `TODO`-Kommentare, `index.test.ts` prüft deinen Code, in `solution/` liegt die Lösung zum Vergleich. Alle Befehle laufen im Ordner `rxjs/`. Wie du die Tests startest, warum sie am Anfang rot sind und wie der Lösungsmodus funktioniert, steht in [`rxjs/README.md`](rxjs/README.md).

## Übungen

Die Reihenfolge folgt der Agenda des Workshops.

| Lektion | ID | Aufgabe |
| --- | --- | --- |
| Wann lohnt sich reaktive Programmierung? | [`rx-why`](rxjs/exercises/rx-why) | Das Projekt steht. Notier drei Features aus deinem Projekt, bei denen Werte über die Zeit eintreffen. |
| Push statt Pull | [`rx-push-pull`](rxjs/exercises/rx-push-pull) | Generator und Observable für eins bis zehn. Wer stößt den nächsten Wert an? |
| Ohne subscribe passiert nichts | [`rx-observable-contract`](rxjs/exercises/rx-observable-contract) | `ticker(ms)` mit `setInterval`, complete nach fünf Werten, Teardown stoppt den Timer. |
| Fast alles wird zum Observable | [`rx-creation`](rxjs/exercises/rx-creation) | Klicks, Timer und Promise als Observables, zusammen geloggt mit Präfix. Demo: `node exercises/rx-creation/demo.ts` |
| Operatoren sind Funktionen in einer pipe | [`rx-operators-pipe`](rxjs/exercises/rx-operators-pipe) | Message Processing: eigene Operatoren `ofType` und `countOfType` mit `filter`, `distinctUntilChanged` und `scan`. |
| Jede Subscription braucht ein Ende | [`rx-subscription-cleanup`](rxjs/exercises/rx-subscription-cleanup) | Drei Subscriptions, ein `destroy$`, `takeUntil` und `finalize`. |
| Welcher Operator kombiniert deine Streams? | [`rx-combining`](rxjs/exercises/rx-combining) | FizzBuzz ohne Modulo: Zahlen und zwei zyklische Streams per `zip`. |
| Cold oder Hot, wer startet den Producer? | [`rx-cold-hot`](rxjs/exercises/rx-cold-hot) | Zwei Subscriber, zwei Requests. Mit `share` nur noch einer. |
| Promises und Observables arbeiten zusammen | [`rx-promises-async`](rxjs/exercises/rx-promises-async) | `fromAbortable(task)`: unsubscribe löst den Abort aus. Dazu `firstValueFrom`. |
| switchMap, mergeMap, concatMap oder exhaustMap? | [`rx-flattening`](rxjs/exercises/rx-flattening) | Suche, Autosave, Upload-Queue und Login mit `switchMap`, `concatMap`, `mergeMap` und `exhaustMap`, jede Wahl begründet. |
| Ein Fehler beendet den Stream | [`rx-error-handling`](rxjs/exercises/rx-error-handling) | Drei URLs mit `mergeMap`, `timeout`, `retry` mit Backoff und Fehlerwert per `catchError`. |
| Subjects teilen Werte, share teilt Arbeit | [`rx-subjects-multicasting`](rxjs/exercises/rx-subjects-multicasting) | Der Letzte macht das Licht aus: eine WebSocket-Verbindung mit `share` und Ref Counting. Dazu ein `CartStore` mit `BehaviorSubject`. |
| Was tun, wenn mehr Events kommen, als du verarbeitest? | [`rx-time-backpressure`](rxjs/exercises/rx-time-backpressure) | Sensor mit tausend Werten pro Sekunde, Live-Wert per `auditTime`, Durchschnitt per `bufferTime`. Demo: `node exercises/rx-time-backpressure/demo.ts` |
| Zeit testen, ohne zu warten | [`rx-marble-testing`](rxjs/exercises/rx-marble-testing) | Hier schreibst du die Tests mit `node:test`, `node:assert` und `TestScheduler`: `interval` ohne Mocks und die Produktsuche aus `search.ts` mit Marble-Diagrammen. Startpunkt ist `search.test.ts` mit `test.todo`, ausführen mit `npm run test:marble`. |

### Zusatzkapitel

| Lektion | ID | Aufgabe |
| --- | --- | --- |
| UI State als Stream von Actions | [`rx-ui-state`](rxjs/exercises/rx-ui-state) | Warenkorb-ViewModel für den Werkstatt-Shop: Aktionen und `scan`, abgeleitet `totalCents$` und `canPlace$`, dazu die letzten fünf Suchen als LRU-Liste. |
| Signals oder Observables? | [`rx-signals-interop`](rxjs/exercises/rx-signals-interop) | Warenkorb und Gesamtsumme als Signal, Produktsuche mit `debounceTime` und `switchMap` als Observable, dazu die Brücken `toObservable` und `toSignal`. |

## Workshop und Folien

- Workshop: [„Reactive Programming mit RxJS“](https://workshops.mikebild.dev/w/reactive-programming/remote/)
- Folien: [slides.mikebild.dev/introduction-reactive-programming](https://slides.mikebild.dev/introduction-reactive-programming.html)

## Archiv

Das ältere Material mit C# und Rx.NET liegt unverändert in [`Examples/`](Examples), dazu der frühere Foliensatz (`Reactive-Programming.pptx`, `Reactive-Programming.pdf`) und das Übersichtsdiagramm `overwiew.drawio`.

## Lizenz

[MIT](LICENSE)

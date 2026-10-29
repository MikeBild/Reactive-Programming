# Anleitung zu den RxJS-Übungen

Hier steht, wie du mit den Übungen arbeitest: Befehle, Aufbau einer Übung, Marble Tests und Lösungsmodus. Voraussetzungen, Einrichten und die Liste der Übungen stehen im [README des Repos](../README.md). Alle Befehle laufen in diesem Ordner.

## Stack

TypeScript im strict-Modus, ESM, RxJS 7.8 und Vitest. Zeitabhängige Tests laufen mit dem `TestScheduler` aus `rxjs/testing` auf virtueller Zeit. Die Lektion `rx-marble-testing` nutzt statt Vitest den eingebauten Test-Runner von Node (`node:test` und `node:assert`), so wie die Lektion es zeigt.

## So arbeitest du mit einer Übung

1. Öffne `exercises/<lektion>/index.ts`. Oben steht die Aufgabe, im Code markieren `TODO`-Kommentare die Lücken.
2. Starte die Tests der Lektion im Watch-Modus, zum Beispiel `npx vitest rx-push-pull`.
3. Füll die Lücken, bis alle Tests grün sind.
4. Hängst du fest, schau in `exercises/<lektion>/solution/`.

**Rote Tests sind am Anfang gewollt.** Die Startpunkte werfen `TODO`-Fehler, deshalb schlagen `npm test` und `npx vitest run` fehl, solange du die Lücken nicht gefüllt hast. Ein paar Tests sind schon grün, etwa „ohne subscribe startet kein Timer“: Das stimmt auch für einen leeren Startpunkt. Vitest meldet außerdem „Unhandled Errors“, weil die Startpunkte ihre `TODO`-Fehler per `subscriber.error` melden. Auch das verschwindet mit deiner Lösung.

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

## Aufbau einer Übung

```text
exercises/rx-flattening/
├── index.ts            Startpunkt mit Aufgabe und TODOs
├── index.test.ts       Tests, laufen gegen index.ts oder die Lösung
└── solution/
    └── index.ts        Lösung mit Begründung im Kommentar
```

Manche Übungen haben Hilfsdateien, die du nicht ändern musst, etwa `fake-socket.ts` oder `signal.ts`. Bei `rx-marble-testing` ist die Aufgabe der Test selbst: Die Lösung liegt in `solution/search.test.ts`.

## Marble Tests mit node:test

`rx-marble-testing` braucht kein Test-Framework. Node.js 26 führt TypeScript-Dateien direkt aus und bringt mit `node:test` einen Test-Runner mit. Der `TestScheduler` bekommt `deepStrictEqual` aus `node:assert/strict` als Vergleich.

```sh
npm run test:marble                                            # deine Tests, offene test.todo werden als todo gemeldet
node --test --watch exercises/rx-marble-testing/search.test.ts # Watch-Modus
npm run test:marble:solution                                   # die Lösung
```

Weil Node.js die Datei ohne Bundler lädt, importierst du lokale Module mit Endung `.ts`, etwa `import { searchResults } from './search.ts'`. Vitest ignoriert diesen Ordner.

## Testen ohne Mocks

Alle Services kommen als Parameter rein, nicht als Import. Im Test ersetzt sie ein `cold` oder `hot` Observable aus dem `TestScheduler` oder eine kleine Fake-Funktion. Eine Mock-Library brauchst du nicht.

Die übrigen Lektionen bleiben bei Vitest: Sie lehren kein bestimmtes Test-Werkzeug, die Tests sind dort nur Prüfhilfe. Vitest liefert den Lösungsmodus unten ohne eigenen Loader und die Fake Timers, die zwei Lektionen brauchen: `rx-observable-contract` baut bewusst auf `setInterval` und nicht auf einem RxJS-Scheduler auf, und `rx-subscription-cleanup` prüft, dass nach `destroy` kein Timer mehr läuft.

## Wie der Lösungsmodus funktioniert

Die Tests importieren immer `./index.js`. Mit `RX_TARGET=solution` biegt ein kleines Plugin in `vitest.config.ts` diesen Import auf `./solution/index.ts` um. So bleiben Tests, Startpunkt und Lösung in einem Ordner und du kannst sie direkt vergleichen.

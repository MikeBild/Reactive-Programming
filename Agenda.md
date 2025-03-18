# Tag 1: Grundlagen von Reactive Programming und Einstieg in ReactiveUI

## Einführung in reaktives Programmieren mit Rx.NET

### Was ist reaktives Programmieren?
- Einführung in Reactive Extensions (Rx.NET)
- Marble Diagrams verstehen und nutzen
- Wichtige Rx.NET-Operatoren (``Select``, `Where`, `Throttle`, `Merge`, ``CombineLatest``)
- Einführung in ReactiveUI

### Überblick: Warum ReactiveUI?
- Unterschiede zu MVVM-Frameworks wie Prism oder MVVM Light
- Grundkonzepte von ReactiveUI: `ReactiveObject`, `ReactiveCommand`, `ObservableAsPropertyHelper`
- Erste ReactiveUI-Anwendung: **"To-Do App Light"**
  - ViewModel mit reaktiven Eigenschaften
  - Bindings zwischen View und ViewModel
  - Erste Commands mit Rx.NET


# Tag 2: Fortgeschrittene ReactiveUI-Konzepte & Marble Diagramme in Aktion

## Erweiterte Nutzung von Rx.NET in ReactiveUI
- Fortgeschrittene Operatoren: Switch, Concat, Buffer, GroupBy
- Visualisierung mit Marble Diagrams (Live-Demos und Übungen)
- Debugging von Rx.NET-Streams mit Do, Materialize, Dematerialize
- Fehlerhandling mit Catch, Retry, ThrownExceptions

## Vertiefung in ReactiveUI-Architektur

- Routing und Navigation mit RoutingState
- Dynamische UI-Updates mit WhenAnyValue
- State Management mit Akavache oder LiteDB
- Arbeiten mit Listen: DynamicData für reaktive Collections

## Hands-On: Mehrseitige Anwendung bauen
- Erweiterung der To-Do-App mit Navigation und Persistenz
- Live-Tests und Debugging mit Rx-Tools

# Tag 3: Testing, Debugging und Best Practices

## Unit-Tests mit ReactiveUI und Rx.NET
- Testen von ViewModels mit TestScheduler
- Mocking von Observables für Unit-Tests
- Schreiben von Tests für ReactiveCommand

### Debugging und Performance-Optimierung
- Fehlerhafte Bindings debuggen mit ReactiveUI.BindingDiagnostics
- Vermeidung von Memory Leaks (DisposeWith, WhenActivated)
- Performance-Optimierung mit Marble Diagrams und Benchmark.NET

### Hands-On: Fehleranalyse & Debugging-Session
- Teilnehmer identifizieren Fehler in einer fehlerhaften ReactiveUI-Anwendung
- Debugging mit Logging & Live-Testing

### Abschlussprojekt: "TaskFlow – Eine reaktive Aufgabenverwaltung"
- Entwicklung einer vollständigen Anwendung mit Fokus auf:
  - Reaktive UI-Updates
  - Effizientes State-Management
  - Tests & Debugging-Strategien
- Präsentation & Diskussion der Lösungen


# Lerninhalte für Tag 1: Grundlagen von Reactive Programming und ReactiveUI

## 1. Einführung in reaktives Programmieren mit Rx.NET

> Ziel: Verständnis der Grundlagen von Rx.NET und wie Marble Diagrams zur Visualisierung genutzt werden können.

📌 Themen:

- Was ist reaktives Programmieren?
- Push vs. Pull: Imperative vs. reaktive Programmierung
- **Observable vs. IEnumerable**: Unterschied zwischen synchronen und asynchronen Datenströmen
- Grundlagen von Rx.NET:
  - `IObservable<T>` und `IObserver<T>`
  - Wichtige Operatoren: `Select`, `Where`, `Throttle`, `Merge`, `CombineLatest`
  - Marble Diagrams zur Veranschaulichung
- Live-Demo mit Rx.NET Playground

✍️ Übung:

Erstelle ein Observable, das Zahlen von 1 bis 10 streamt, aber nur gerade Zahlen durchlässt.
Visualisiere das Verhalten mit einem Marble Diagram.

## 2. Einführung in ReactiveUI

> Ziel: Grundlagen von ReactiveUI kennenlernen und erste Bindings erstellen.

📌 Themen:

- Was ist ReactiveUI und warum verwenden wir es?
- Kernkonzepte:
  - `ReactiveObject` – Zustandsverwaltung
  - `ReactiveCommand` – Ereignisgesteuerte Logik
  - `ObservableAsPropertyHelper` – Automatische UI-Updates
- Binding-Grundlagen:
  - `this.WhenAnyValue()` zur Beobachtung von Property-Änderungen
  - One-Way- und Two-Way-Bindings


✍️ Übung:

- Erstelle ein `ViewModel`, das eine `Text`-Property enthält.
- Erstelle eine einfache WPF Oberfläche, die sich bei Änderungen des `ViewModel` aktualisiert.

## 3. Beispielanwendung: "To-Do App Light"

> Ziel: Eine einfache ReactiveUI-Anwendung zur Verwaltung von Aufgaben erstellen.

📌 Features:
- ✅ Aufgaben hinzufügen
- ✅ Aufgaben als erledigt markieren
- ✅ Reaktives UI-Update

🔹 Projektstruktur:

```
ToDoAppLight/
│── ViewModels/
│   ├── MainViewModel.cs
│── Views/
│   ├── MainView.xaml
│── Models/
│   ├── ToDoItem.cs
│── App.xaml.cs
│── MainWindow.xaml.cs
```

📝 Funktionalitäten:

- Einfügen von Aufgaben über ein Textfeld
- Hinzufügen-Button mit `ReactiveCommand`
- Liste von Aufgaben mit Checkboxes zum Markieren als erledigt

🎯 Nächste Schritte:

- Testing für das ViewModel schreiben
- Debugging-Tools für ReactiveUI demonstrieren
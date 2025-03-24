namespace Live.Demos
{
    public static class Observer
    {
        public static IObserver<T> Create<T>()
        {
            return System.Reactive.Observer.Create<T>(
            onNext: value => Console.WriteLine($"Value: {value}"),
            onError: error => Console.WriteLine($"Error: {error}"),
            onCompleted: () => Console.WriteLine("Complete!"));
        }
    }
}
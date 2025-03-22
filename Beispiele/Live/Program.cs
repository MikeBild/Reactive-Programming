using System.Reactive.Disposables;
using System.Reactive.Linq;
using Live.Demos;

namespace Live
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {
            #region Creation
            var allSubscriptions = new CompositeDisposable();

            var subscription1 = Creation.Create([1, 2, 3])
            .Subscribe(line =>
            {
                Console.WriteLine(line);
            });

            var subscription2 = Creation.Range(1, 5)
            .Subscribe(line =>
            {
                Console.WriteLine(line);
            });

            allSubscriptions.Add(Creation.Interval()
            .Subscribe(line =>
            {
                Console.WriteLine(line);
            }));

            allSubscriptions.Add(Creation.FromEventPattern()
            .Subscribe(line =>
            {
                Console.WriteLine(line);
            }));
            #endregion

            #region Observer
            var observable = Observable.Range(1, 5);
            var observer = Live.Demos.Observer.Create<int>();
            observable.Subscribe(observer);
            #endregion

            #region Operators
            var evens = Operators.OnlyEvens();
            var evensSub = evens.Subscribe(Console.WriteLine);
            #endregion

            #region Callbacks

            var callbackSub = Callbacks.Callback()
            .Subscribe(
                onNext: Console.WriteLine,
                onCompleted: () => Console.WriteLine("Complete!")
            );
            #endregion

            #region Async
            var asyncResult = await Async.LoadAsyncFake();
            Console.WriteLine($"LoadAsyncFake {asyncResult}");

            var observableAsyncResult = Async.FromAsync();
            var observableAsyncResultSub = observableAsyncResult.Subscribe(
                onNext: data => Console.WriteLine($"FromAsync Result: {data}"),
                onCompleted: () => Console.WriteLine("FromAsync Complete!")
            );

            var observableLoadJSONAsyncResult = Async.LoadJSONFromAsync();
            var observableLoadJSONAsyncResultSub = observableLoadJSONAsyncResult.Subscribe(
                onNext: data => Console.WriteLine($"LoadJSONFromAsync Result: {data}"),
                onError: error => Console.WriteLine($"LoadJSONFromAsync Error: {error.Message}"),
                onCompleted: () => Console.WriteLine("LoadJSONFromAsync Complete!")
            );

            //CanellationToken
            var cts = new CancellationTokenSource();
            var observableLoadJSONAsyncResult2 = Async.LoadJSONFromAsync(cts.Token);

            //SelectMany, Timeout, Error Handling, CanellationToken
            var urls = new[]
            {
                "https://jsonplaceholder.typicode.com/posts/1",
                "https://jsonplaceholder.typicode.com/posts/2",
                "https://jsonplaceholder.typicode.com/posts/3"
            };
            var observableLoadJSONAsyncResult3 = Async.LoadJSONsFromAsync(urls, cts.Token);

            cts.Cancel();
            #endregion

            #region Main
            Console.WriteLine("Press enter to exit.");
            Console.ReadLine();
            #endregion

            #region Dispose
            subscription1.Dispose();
            allSubscriptions.Dispose();
            evensSub.Dispose();
            callbackSub.Dispose();
            observableAsyncResultSub.Dispose();
            observableLoadJSONAsyncResultSub.Dispose();
            #endregion
        }
    }
}
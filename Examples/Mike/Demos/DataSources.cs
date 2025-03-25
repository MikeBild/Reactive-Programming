using System.Reactive.Linq;

namespace Mike.Demos
{
    public static class DataSources
    {
        public static IObservable<string> MyDataSource()
        {            
            return Observable.Create<string>(observer =>
            {
                observer.OnNext("Hello");
                observer.OnNext("World");

                observer.OnCompleted(); // alternative observer.OnError(new Exception("Error!"));

                return () =>
                {
                    // cleanup allocated resouces
                    Console.WriteLine("Cleanup");
                };
            });
        }
    }
}
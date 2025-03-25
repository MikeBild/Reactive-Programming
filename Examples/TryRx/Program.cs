using System.Reactive;
using System.Reactive.Linq;
using Mike.Demos;
using System.Reactive.Disposables;
using System.Linq;

namespace Mike
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine("Hello, Reactive Workshop!");

            DownloadData(result =>
            {
                Console.WriteLine(result);
            });

            var l1 = new List<int>([1, 2, 3]);

            var o1 = l1.ToObservable().Do(Console.WriteLine);

            o1.Subscribe();

            o1.ToEnumerable().ToList().ForEach(Console.Write);                        
            
            var subs = new CompositeDisposable();

            var foo = DataSources
            .MyDataSource()
            .MyDouble();

            subs.Add(foo
            .Do(value =>
            {
                //side effects
                Console.WriteLine(value);
            })
            .Subscribe());

            subs.Add(foo
            .Do(value =>
            {
                //side effects
                Console.WriteLine(value);
            })
            .Subscribe());

            subs.Dispose();

            Console.ReadLine();
        }

        public static void DownloadData(Action<string> callback)
        {
            Task.Run(() =>
            {
                Thread.Sleep(1000);
                callback("completetd!");
            });
        }
    }
}
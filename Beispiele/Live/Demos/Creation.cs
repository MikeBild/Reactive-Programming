using System.Reactive;
using System.Reactive.Linq;

namespace Live.Demos
{
    public static class Creation
    {
        public static IObservable<T> Create<T>(T[] list)
        {
            return Observable.Create<T>(observer =>
            {
                // await Task.Delay(1000);
                foreach (var item in list)
                {
                    observer.OnNext(item);
                }

                return () => { };
            });
        }

        public static IObservable<long> Interval()
        {
            return Observable.Interval(TimeSpan.FromSeconds(1));
        }

        public static IObservable<int> Range(int from, int to)
        {
            return Observable.Range(from, to);
        }

        public class SomeEventArgs : EventArgs { }
        public static event EventHandler<SomeEventArgs> GenericEvent;

        public static IObservable<EventPattern<SomeEventArgs>> FromEventPattern()
        {
            return Observable.FromEventPattern<SomeEventArgs>(
               ev => GenericEvent += ev,
               ev => GenericEvent -= ev);
        }
    }
}
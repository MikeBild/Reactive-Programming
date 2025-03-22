using System.Reactive.Linq;

namespace Live.Demos
{
    public static class Operators
    {

        public static IObservable<string> OnlyEvens()
        {
            var numbers = Observable.Interval(TimeSpan.FromMilliseconds(500));
            return numbers
                .Where(x => x % 2 == 0)
                .Select(x => $"Even number: {x}");
        }
    }
}
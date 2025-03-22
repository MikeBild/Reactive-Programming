using System.Reactive.Linq;

namespace Live.Demos
{
    public static class PushVSPull
    {
        public static IEnumerable<string> Pull()
        {
            var numbers = new List<int> { 1, 2, 3, 4, 5 };

            return numbers
                .Where(x => x % 2 == 0)
                .Select(x => $"Even number: {x}");
        }

        public static IObservable<string> Push()
        {
            var numbers = new List<int> { 6, 7, 8, 9, 10 };

            return numbers
                .ToObservable()
                .Where(x => x % 2 == 0)
                .Select(x => $"Even number: {x}");
        }

        public static IEnumerable<T> ToIEnumerable<T>(IObservable<T> observable)
        {
            return observable
                .ToEnumerable();
        }
    }
}
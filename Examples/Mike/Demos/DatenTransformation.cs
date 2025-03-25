using System.Reactive.Linq;

namespace Mike.Demos
{
    public static class DataTransformation
    {
        public static IObservable<string> MyDouble(this IObservable<string> source)
        {
            return source.Select(Double);
        }

        public static string Double(string value) {
            return value + value;
        }
    }
}
using System;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Live.Demos
{
    public static class Async
    {
        public static async Task<string> LoadAsyncFake()
        {
            await Task.Delay(1000);
            return "Async data loaded!";
        }

        public static IObservable<string> FromAsync()
        {
            return Observable.FromAsync(() => LoadAsyncFake());
        }

        public static async Task<string> LoadJSONAsync()
        {
            using var client = new HttpClient();
            return await client.GetStringAsync("https://jsonplaceholder.typicode.com/posts/1");
        }

        public static async Task<string> LoadJSONAsync(CancellationToken token)
        {
            using var client = new HttpClient();
            return await client.GetStringAsync("https://jsonplaceholder.typicode.com/posts/1", token);
        }

        public static async Task<string> LoadJSONAsync(string URL, CancellationToken token)
        {
            using var client = new HttpClient();
            return await client.GetStringAsync(URL, token);
        }

        public static IObservable<string> LoadJSONsFromAsync(string[] URLs, CancellationToken token)
        {
            var urlStream = URLs.ToObservable();
            return urlStream
                .SelectMany(url =>
                    Observable.FromAsync(() => LoadJSONAsync(url, token))
                              .Timeout(TimeSpan.FromSeconds(2))
                              .Catch<string, Exception>(ex => Observable.Return($"Error: {ex.Message}"))
                );
        }

        public static IObservable<string> LoadJSONFromAsync()
        {
            return Observable.FromAsync(() => LoadJSONAsync());
        }
        public static IObservable<string> LoadJSONFromAsync(CancellationToken token)
        {
            return Observable.FromAsync(() => LoadJSONAsync(token));
        }
    }
}
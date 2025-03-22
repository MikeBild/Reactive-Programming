using System.Reactive.Linq;

namespace Live.Demos
{

    public interface IApiClient
    {
        IObservable<string> GetData();
    }

    public class ApiClient : IApiClient
    {
        private readonly HttpClient _httpClient;

        public ApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public IObservable<string> GetData()
        {
            return Observable
                .FromAsync(() => _httpClient.GetStringAsync("https://jsonplaceholder.typicode.com/posts/1"))
                .Timeout(TimeSpan.FromSeconds(2));
        }
    }
}
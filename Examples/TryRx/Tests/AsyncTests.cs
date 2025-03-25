using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;
using System.Threading.Tasks;
using Moq;

namespace Mike.Tests;

public class AsyncTests
{
    [Fact]
    public async Task Test1()
    {
        var sut = new Mock<IApiClient>();

        sut.Setup(m => m.GetData()).Returns(Task.FromResult("Mock Data"));

        var actual = await sut.Object.GetData();

        Assert.Equal("Mock Data", actual);
    }

    [Fact]
    public async Task Test2()
    {
        var sut = new Mock<IApiClient>();

        sut.Setup(m => m.GetDataStream()).Returns(Observable.Return("Mock Data Stream"));

        var actual = await sut.Object.GetDataStream().ToTask();

        Assert.Equal("Mock Data Stream", actual);
    }

    [Fact]
    public async Task Test3()
    {
        var sut = new Mock<IApiClient>();

        sut.Setup(m => m.GetDataStream()).Returns(Observable.Never<string>().Timeout(TimeSpan.FromMilliseconds(1000)));

        var exception = Record.Exception(() =>
        {
            sut.Object.GetDataStream().ToTask().Wait();
        });

        Assert.NotNull(exception);
        Assert.IsType<TimeoutException>(exception.InnerException ?? exception);
    }

}

public interface IApiClient
{
    Task<string> GetData();
    IObservable<string> GetDataStream();
}

public class ApiClient : IApiClient
{
    private readonly HttpClient httpClient;

    public ApiClient(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }

    public Task<string> GetData()
    {
        return httpClient.GetStringAsync("https://jsonplaceholder.typicode.com/todos/1");
    }

    public IObservable<string> GetDataStream()
    {
        return Observable
            .FromAsync(GetData)
            .Timeout(TimeSpan.FromSeconds(2))
            .Catch<string, Exception>(ex => Observable.Return($"Error: {ex.Message}"));
    }
}
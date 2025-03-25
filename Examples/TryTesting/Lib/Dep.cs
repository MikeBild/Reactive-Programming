
namespace TryTesting.Tests;

class Dep : IDep
{    
    public Task<string> FetchData()
    {
        return Task.FromResult("Hello");
    }
}
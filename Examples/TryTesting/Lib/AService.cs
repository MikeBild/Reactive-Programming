using System.Threading.Tasks;
using TryTesting.Tests;

namespace TryTesting.Lib;

public class AService
{
    private readonly IDep dep;

    public AService(IDep dep)
    {
        this.dep = dep;
    }

    public async Task<string> Do()
    {
        return await dep.FetchData();
    }
}

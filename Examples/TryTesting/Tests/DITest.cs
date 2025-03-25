using System.Threading.Tasks;
using TryTesting.Lib;

namespace TryTesting.Tests;

public class DITest
{
    [Fact]
    public async Task Foo()
    {
        // Arrange
        var dep = new Dep();
        var sut = new AService(dep);

        // Act
        var actual = await sut.Do();

        // Assert
        Assert.Equal("Hello", actual);
    }
}

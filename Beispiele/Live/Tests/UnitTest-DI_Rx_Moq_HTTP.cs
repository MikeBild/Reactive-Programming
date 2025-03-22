using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;
using Live.Demos;
using Moq;

namespace Live.Tests
{
    public class UnitTest_DI_Rx_Moq_HTTP
    {
        [Fact]
        public void Successful_Result()
        {
            // Arrange
            var mock = new Mock<IApiClient>();
            var result = Observable.Return("MOCK DATA");

            mock.Setup(m => m.GetData()).Returns(result);

            // Act
            var data = mock.Object.GetData().ToTask().Result;

            // Assert
            Assert.Equal("MOCK DATA", data);
        }

        [Fact]
        public void Failure_Exceptions()
        {
            // Arrange
            var mock = new Mock<IApiClient>();
            var never = Observable.Never<string>(); // simulate stream that never ends

            mock.Setup(c => c.GetData()).Returns(
                () => never.Timeout(TimeSpan.FromMilliseconds(100)) // Timeout simulation
            );

            // Act & Assert
            var exception = Record.Exception(() =>
            {
                mock.Object.GetData()
                    .ToTask() // to catch exceptions synchronous
                    .Wait();
            });

            Assert.NotNull(exception);
            Assert.IsType<TimeoutException>(exception.InnerException ?? exception);
        }
    }
}
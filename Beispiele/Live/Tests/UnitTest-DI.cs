using Live.Demos;
using Moq;

namespace Live.Tests
{
    public class UnitTest_DI
    {
        [Fact]
        public void Test1()
        {
            // Arrange
            var emailMock = new Mock<IEmailService>();
            var service = new OrderService(emailMock.Object);

            // Act
            service.ProcessOrder();
            
            // Assert
            emailMock.Verify(e => e.Send("Order done"), Times.Once);
        }
    }
}
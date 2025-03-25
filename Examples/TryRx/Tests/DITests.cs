using Mike.Demos;
using Moq;

namespace Mike.Tests;

public class DITests
{
    [Fact]
    public void DITest1()
    {
        //Arrange
        var emailService = new Mock<IEMailService>();
        var sut = new OrderService(emailService.Object);

        //Act
        sut.ProcessOrder();

        //Assert
        emailService.Verify(e => e.Send("Order done"), Times.Once);
    }
}

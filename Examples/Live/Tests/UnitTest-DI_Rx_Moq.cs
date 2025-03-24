using System.Reactive.Linq;
using Live.Demos;
using Moq;

namespace Live.Tests
{
    public class UnitTest_DI_Rx_Moq
    {
        [Fact]
        public void Test1()
        {
            // Arrange
            var mockService = new Mock<IMessageService>();
            var messageStream = new[] {
                "OK: Nachricht 1",
                "FEHLER: Datenbank",
                "OK: Nachricht 2"
            }.ToObservable();
            mockService.Setup(s => s.GetMessages()).Returns(messageStream);

            // Act
            var processor = new MessageProcessor(mockService.Object);

            // Assert
            Assert.Equal(2, processor.ProcessedMessages.Count);
            Assert.All(processor.ProcessedMessages, msg => Assert.StartsWith("OK", msg));
        }
    }
}
using System.Reactive.Linq;
using Mike.Demos;
using System.Linq;
using Moq;

namespace Mike.Tests;

public class RxTests
{
    [Fact]
    public void Test1()
    {
        var expected = new[] { "Hello", "World" };
        var sut = DataSources.MyDataSource();

        var actual = sut.ToEnumerable().ToArray();

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void Test2()
    {
        var mockService = new Mock<IMessageService>();
        var messageStream = new[] {
            "OK: A",
            "ERROR: A",
            "OK: B"
        }.ToObservable();

        mockService.Setup(s => s.GetMessages()).Returns(messageStream);

        var processor = new MessageProcessor(mockService.Object);

        Assert.Equal(2, processor.ProcessedMessages.Count);
    }
}

public class MessageProcessor
{
    private readonly IMessageService messageService;

    public MessageProcessor(IMessageService messageService)
    {
        this.messageService = messageService;
        this.messageService
            .GetMessages()
            .Where(m => m.StartsWith("OK"))
            .Do(x => ProcessedMessages.Add(x))
            .Subscribe();
    }

    public List<string> ProcessedMessages { get; } = [];
}

public interface IMessageService
{
    IObservable<string> GetMessages();
}
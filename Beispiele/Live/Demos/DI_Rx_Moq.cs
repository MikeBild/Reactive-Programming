using System.Reactive.Linq;

namespace Live.Demos
{
    public interface IMessageService
    {
        IObservable<string> GetMessages();
    }

    public class MessageProcessor
    {
        private readonly IMessageService _service;

        public List<string> ProcessedMessages { get; } = new();

        public MessageProcessor(IMessageService service)
        {
            _service = service;

            _service.GetMessages()
                    .Where(m => m.StartsWith("OK"))
                    .Subscribe(msg => ProcessedMessages.Add(msg));
        }
    }

}
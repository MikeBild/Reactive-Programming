namespace Mike.Demos
{
    public interface IEMailService
    {
        void Send(string message);
    }

    public class EMailService : IEMailService
    {
        public void Send(string message) => Console.WriteLine($"Mail: {message}");
    }

    public class OrderService
    {
        private readonly IEMailService eMailService;

        public OrderService(IEMailService eMailService)
        {
            this.eMailService = eMailService;
        }

        public void ProcessOrder()
        {
            this.eMailService.Send("Order done");
        }
    }
}
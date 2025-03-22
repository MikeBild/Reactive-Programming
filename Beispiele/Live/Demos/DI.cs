namespace Live.Demos
{
    public interface IEmailService
    {
        void Send(string message);
    }

    public class EmailService : IEmailService
    {
        public void Send(string message) => Console.WriteLine($"Mail: {message}");
    }

    public class OrderService
    {
        private readonly IEmailService _emailService;

        public OrderService(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public void ProcessOrder()
        {
            _emailService.Send("Order done");
        }
    }
}
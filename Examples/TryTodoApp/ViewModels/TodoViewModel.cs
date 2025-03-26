using ReactiveUI;

namespace TryTodoApp.ViewModels
{
    public class TodoViewModel : ReactiveObject
    {
        private bool _isCompleted;
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted
        {
            get => _isCompleted;
            set => this.RaiseAndSetIfChanged(ref _isCompleted, value);
        }
    }
}
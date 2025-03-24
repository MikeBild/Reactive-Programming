using System.Collections.ObjectModel;
using System.Reactive;
using ReactiveUI;
using TodoApp.Models;

namespace TodoApp.ViewModels
{
    public partial class MainWindowViewModel : ReactiveObject
    {

        private string _newTask;
        public string NewTask
        {
            get => _newTask;
            set => this.RaiseAndSetIfChanged(ref _newTask, value);
        }

        public ObservableCollection<TodoItem> Tasks { get; } = [];
        public ReactiveCommand<Unit, Unit> AddTaskCommand { get; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
        public MainWindowViewModel()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
        {
            AddTaskCommand = ReactiveCommand.Create(AddTask);
        }

        private void AddTask()
        {
            if (!string.IsNullOrWhiteSpace(NewTask))
            {
                Tasks.Add(new TodoItem { Description = NewTask, IsCompleted = false });
                NewTask = string.Empty;
            }
        }

    }
}
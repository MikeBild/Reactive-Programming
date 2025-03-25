using System;
using System.Collections.ObjectModel;
using System.Reactive;
using ReactiveUI;
using TryTodoApp.Models;

namespace TryTodoApp.ViewModels
{
    public class MainViewModel : ReactiveObject
    {
        public ObservableCollection<TodoItem> Items { get; } = [];
        private string _newItem = string.Empty;
        public string NewItem { get => _newItem; set => this.RaiseAndSetIfChanged(ref _newItem, value); }
        public ReactiveCommand<Unit, Unit> AddItemCommand { get; }

        public MainViewModel()
        {
            AddItemCommand = ReactiveCommand.Create(AddItem);
        }

        private void AddItem()
        {
            Items.Add(new TodoItem { IsCompleted = false, Title = NewItem });
            NewItem = string.Empty;
        }
    }
}
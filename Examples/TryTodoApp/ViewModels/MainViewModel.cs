using System.Collections.ObjectModel;
using System.Reactive;
using System.Reactive.Linq;
using ReactiveUI;
using TryTodoApp.Models;

namespace TryTodoApp.ViewModels
{
    public class MainViewModel : ReactiveObject
    {
        public TodoListViewModel TodoListViewModel { get; set; } = new TodoListViewModel();
        private string _newItem = string.Empty;

        private readonly ObservableAsPropertyHelper<bool> _hasItems;
        public bool HasItems => _hasItems.Value;

        public ObservableCollection<TodoViewModel> Items { get; } = [];

        public string NewItem { get => _newItem; set => this.RaiseAndSetIfChanged(ref _newItem, value); }
        public ReactiveCommand<Unit, Unit> AddItemCommand { get; }

        public MainViewModel()
        {
            var canAddItemExecute = this.WhenAnyValue(x => x.NewItem, x => !string.IsNullOrWhiteSpace(x));
            AddItemCommand = ReactiveCommand.Create(AddItem, canAddItemExecute);

            this.WhenAnyValue(x => x.Items.Count)
                .Select(count => count > 0)
                .ToProperty(this, x => x.HasItems, out _hasItems);
        }
        
        public MainViewModel(IBusinessDomain domain) : this()
        {
            
        }

        private void AddItem()
        {
            Items.Add(new TodoViewModel { IsCompleted = false, Title = NewItem });
            NewItem = string.Empty;
        }
    }
}
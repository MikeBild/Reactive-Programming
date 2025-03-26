using Avalonia.Controls;
using TryTodoApp.ViewModels;

namespace TryTodoApp.Views;

public partial class TodoListView : UserControl
{
    public TodoListView()
    {        
        DataContext = new TodoListViewModel();
        InitializeComponent();
    }
}
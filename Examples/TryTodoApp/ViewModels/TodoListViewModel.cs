using DynamicData;
using ReactiveUI;
using System;
using System.Collections.ObjectModel;

namespace TryTodoApp.ViewModels;

public class TodoListViewModel : ReactiveObject, IDisposable
{
    private readonly SourceList<TodoViewModel> _todoList = new();
    private readonly ReadOnlyObservableCollection<TodoViewModel> _filteredTodoList;
    public ReadOnlyObservableCollection<TodoViewModel> FilteredTodoList => _filteredTodoList;

    private readonly IDisposable _cleanUp;

    public TodoListViewModel()
    {
        _todoList.Add(new TodoViewModel { Title = "demo 1", IsCompleted = true });
        _todoList.Add(new TodoViewModel { Title = "demo 2", IsCompleted = false });
        _cleanUp = _todoList
            .Connect()
            .Filter(p => p.IsCompleted)
            .Bind(out _filteredTodoList)
            .DisposeMany()
            .AutoRefresh(p => p.IsCompleted)
            .AsObservableList();
    }

    public void AddTodo(TodoViewModel Todo)
    {
        _todoList.Add(Todo);
    }

    public void Dispose()
    {
        _cleanUp.Dispose();
    }
}
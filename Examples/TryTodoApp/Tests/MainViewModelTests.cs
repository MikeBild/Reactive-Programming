using System;
using System.Linq;
using System.Reactive.Linq;
using TryTodoApp.ViewModels;

namespace TryTodoApp.Tests;

public class MainViewModelTests
{
    [Fact]
    public void Are_items_empty()
    {
        var sut = new MainViewModel();

        Assert.Empty(sut.Items);
        Assert.NotNull(sut.Items);
    }

    [Fact]
    public void Can_add_item()
    {
        var sut = new MainViewModel();
        sut.NewItem = "Todo 1";

        sut.AddItemCommand.Execute().Subscribe();

        Assert.Single(sut.Items);
        Assert.Equal("Todo 1", sut.Items.First().Title);
    }

    [Fact]
    public void Can_not_add_whitespace_item()
    {
        var sut = new MainViewModel();
        sut.NewItem = " ";

        var canExecute = sut.AddItemCommand.CanExecute.FirstAsync().Wait();

        Assert.False(canExecute);
    }
}

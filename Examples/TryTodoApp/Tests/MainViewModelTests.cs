using System;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using TryTodoApp.ViewModels;

namespace TryTodoApp.Tests;

public class MainViewModelTests
{
    [Fact]
    public void Items_Tests()
    {
        var sut = new MainViewModel();

        Assert.Empty(sut.Items);
        Assert.NotNull(sut.Items);
    }

    [Fact]
    public void Items_Add()
    {
        var sut = new MainViewModel();
        sut.NewItem = "Todo 1";

        sut.AddItemCommand.Execute().Subscribe();


        Assert.Single(sut.Items);
        Assert.Equal("Todo 1", sut.Items.First().Title);
    }
}

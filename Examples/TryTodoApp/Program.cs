using Avalonia;
using Avalonia.ReactiveUI;
using System;
using TryTodoApp.Models;

namespace TryTodoApp;

class Program
{
    [STAThread]
    public static void Main(string[] args) => BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);
    
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .WithInterFont()
            .LogToTrace()
            .UseReactiveUI();

    public static IBusinessDomain Domain = new BusinessDomain();
}

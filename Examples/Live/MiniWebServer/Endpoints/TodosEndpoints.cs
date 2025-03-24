using Live.MiniWebServer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Live.MiniWebServer.Services;

namespace Live.MiniWebServer.Endpoints
{
    public static class TodosEndpoints
    {
        public static void MapMessageEndpoints(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapPost("/todos", async context =>
            {
                var todo = await context.Request.ReadFromJsonAsync<Todo>();
                var service = context.RequestServices.GetRequiredService<ITodosService>();

                service.AddTodo(todo!);
                context.Response.StatusCode = 201;
                await context.Response.WriteAsJsonAsync(todo);
            });

            endpoints.MapGet("/todos", async context =>
            {
                var service = context.RequestServices.GetRequiredService<ITodosService>();
                var todos = service.GetTodos();
                await context.Response.WriteAsJsonAsync(todos);
            });
        }
    }
}

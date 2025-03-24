using Live.MiniWebServer.Models;

namespace Live.MiniWebServer.Services
{
    public interface ITodosService
    {
        void AddTodo(Todo msg);
        List<Todo> GetTodos();
    }
}
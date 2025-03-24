using Live.MiniWebServer.Models;

namespace Live.MiniWebServer.Services
{
    public class InMemoryTodosService : ITodosService
    {
        private readonly List<Todo> _Todos = [];

        public void AddTodo(Todo msg)
        {
            _Todos.Add(msg);
        }

        public List<Todo> GetTodos()
        {
            return _Todos;
        }
    }
}

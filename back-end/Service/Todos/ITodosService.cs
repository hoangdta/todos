using todos_back_end.Models;

namespace todos_back_end.Service.Todos
{
    public interface ITodosService
    {
        List<Todo> GetTodos();
        Boolean AddTodo(Todo todo);
        Boolean Update(Todo todo);
        Boolean Delete(int id);

    }
}

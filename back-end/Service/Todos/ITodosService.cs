using Microsoft.AspNetCore.Mvc;
using todos_back_end.Models;

namespace todos_back_end.Service.Todos
{
    public interface ITodosService
    {
        List<Todo> GetTodos();
        Todo GetTodoById(int id);
        int AddTodo(Todo todo);
        bool Update(Todo todo);
        bool Delete(int id);

    }
}

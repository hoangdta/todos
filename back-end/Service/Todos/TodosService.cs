using todos_back_end.Data;
using todos_back_end.Models;

namespace todos_back_end.Service.Todos
{
    public class TodosService : ITodosService
    {
        private readonly TodosDbContext _todosDbContext;

        public TodosService(TodosDbContext todosDbContext)
        {
            _todosDbContext = todosDbContext;
        }
        public bool AddTodo(Todo todo)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Todo todo)
        {
            throw new NotImplementedException();
        }

        public List<Todo> GetTodos()
        {
            return _todosDbContext.Todos.OrderByDescending(td => td.Id).ToList();
        }

        public bool Update(Todo todo)
        {
            throw new NotImplementedException();
        }
    }
}

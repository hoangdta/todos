using Microsoft.AspNetCore.Mvc;
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

        public int AddTodo(Todo todo)
        {
            _todosDbContext.Todos.Add(todo);
            _todosDbContext.SaveChanges();
            return todo.Id;
        }

        public bool Delete(int id)
        {
            Todo todo = _todosDbContext.Todos.Find(id);
            if (todo == null) { return false; }
            _todosDbContext.Todos.Remove(todo);
            _todosDbContext.SaveChanges();
            return true;
        }

        public List<Todo> GetTodos()
        {
            return _todosDbContext.Todos.OrderByDescending(td => td.Id).ToList();
        }

        public Todo GetTodoById(int id) {
            Todo todo = _todosDbContext.Todos.Find(id);
            return todo;
        }
        public bool Update(Todo todo)
        {
            var findItem = _todosDbContext.Todos.FirstOrDefault(td => td.Id == todo.Id);
            if (findItem == null) {
                return false;
            }

            findItem.Name = todo.Name;
            findItem.IsComplete = todo.IsComplete;
            _todosDbContext.Todos.Update(findItem);
            _todosDbContext.SaveChanges();
            return true;
        }
    }
}

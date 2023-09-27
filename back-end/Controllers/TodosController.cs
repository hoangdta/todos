using Microsoft.AspNetCore.Mvc;
using todos_back_end.Models;
using todos_back_end.Service.Todos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace todos_back_end.Controllers
{
    [Route("v1/api/todos")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodosService _todosService;

        public TodosController(ITodosService todosService)
        {
            _todosService = todosService;
        }

        // GET: api/<TodosController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_todosService.GetTodos());
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var itemFinded = _todosService.GetTodoById(id);
            return itemFinded != null ? Ok(itemFinded) : NotFound();
        }
        // POST api/<TodosController>
        [HttpPost]
        public IActionResult Post(Todo todo)
        {
            return Ok(_todosService.AddTodo(todo));
        }

        // PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Todo todo)
        {
            return _todosService.Update(todo) ? Ok() : NotFound();
        }

        // DELETE api/<TodosController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return  _todosService.Delete(id) ? Ok() : BadRequest();
        }
    }
}

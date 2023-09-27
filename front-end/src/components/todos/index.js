import { useEffect, useState } from "react";
import "./index.css";
import {
  getTodosAPI,
  delTodosAPI,
  addTodosAPI,
  updateTodosAPI,
} from "../../api/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTodos(await getTodosAPI());
  };

  const delTodo = async (id) => {
    if (window.confirm("Are you sure ? It can not undo.")) {
      await delTodosAPI(id);
      // reload list
      fetchData();
    }
  };

  const addOrEditTodo = async (event) => {
    event.preventDefault();
    // first input
    const name = event.target[0].value;
    //second input
    const id = event.target[1].value;
    // third input
    const isComplete = event.target[2].value;

    if (id === "") {
      // add new todo
      await addTodosAPI({
        name: name,
      });
      // reload list
      fetchData();
    } else {
      // edit todo
      await updateTodosAPI({
        name: name,
        isComplete: isComplete,
      });
    }
  };
  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
      {todos ? (
        todos?.map((item, key) => (
          <li className={item.isComplete ? "done" : ""}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button className="btn-picto" type="button">
                <i className="fas fa-edit" />
              </button>
              <button
                onClick={() => delTodo(item.id)}
                className="btn-picto"
                type="button"
                aria-label="Delete"
                title="Delete"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>Danh sách nhiệm vụ trống.</p>
      )}
      {/*
              <li>
                <span className="label">123</span>
                <div className="actions">
                  <button className="btn-picto" type="button">
                    <i className="fas fa-user-edit" />
                  </button>
                  <button
                    className="btn-picto"
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </li>
          */}
      <form onSubmit={addOrEditTodo}>
        <label htmlFor="name">Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="number" name="id" id="id" />
        <button type="submit">Thêm mới</button>
      </form>
    </main>
  );
};

export default Todos;

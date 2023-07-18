import { useEffect, useState } from "react";
import "./index.css";
import { getTodosAPI, delTodosAPI } from "../../api/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      setTodos(await(getTodosAPI()));
  };

    const delTodo = async (id) => {
        if (window.confirm("Are you sure ? It can not undo.")) {
            await (delTodosAPI(id));
            window.location.reload();
        }
    };
  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
          {
              todos?.map((item, key) => (

                  <li className={item.isComplete ? "done" : ""}>
                      <span className="label">{ item.name }</span>
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
          }
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
      <p>Danh sách nhiệm vụ trống.</p>
      <form>
        <label htmlFor="name">Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="name" />
        <button type="button">Thêm mới</button>
      </form>
    </main>
  );
};

export default Todos;

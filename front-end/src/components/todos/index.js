import { useEffect, useState, useRef } from "react";
import "./index.css";
import {
  getTodosAPI,
  delTodosAPI,
  addTodosAPI,
  updateTodosAPI,
} from "../../api/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef([]);
  const [textBtn, setTextBtn] = useState("Thêm mới");

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

    if (id === "") {
      // add new todo
      await addTodosAPI({
        name: name,
        isComplete: 0,
      });
    } else {
      // edit todo
      await updateTodosAPI({
        name: name,
        id: id,
      });
    }
    // reload list
    fetchData();
  };

  const editTodo = async (id) => {
    todoRef?.current.forEach((item) => {
      if (item.getAttribute("data-id") !== String(id)) {
        item.className = "fas fa-edit";
      }
    });
    const inputName = document.getElementById("name");
    const inputId = document.getElementById("id");
    if (todoRef?.current[id].className === "fas fa-edit") {
      todoRef.current[id].className = "fas fa-user-edit";
      setTextBtn("Cập nhật");
      inputName.value = todoRef.current[id].getAttribute("data-name");
      inputId.value = id;
    } else {
      todoRef.current[id].className = "fas fa-edit";
      inputName.value = "";
      inputId.value = null;
      setTextBtn("Thêm mới");
    }
  };

  const doneTodo = async (item) => {
    let newTodo = { ...item };
    newTodo.isComplete = true;
    await updateTodosAPI(newTodo);
    fetchData();
  };

  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>
      {todos ? (
        todos?.map((item, key) => (
          <li
            className={item.isComplete ? "done" : ""}
            key={key}
            onDoubleClick={() => doneTodo(item)}
          >
            <span className="label">{item.name}</span>
            <div className="actions">
              <button
                onClick={() => editTodo(item.id)}
                className="btn-picto"
                type="button"
              >
                <i
                  ref={(el) => (todoRef.current[item.id] = el)}
                  data-name={item.name}
                  data-id={item.id}
                  className="fas fa-edit"
                />
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
      <form onSubmit={addOrEditTodo}>
        <label htmlFor="name">Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="number" name="id" id="id" />
        <button type="submit">{textBtn}</button>
      </form>
    </main>
  );
};

export default Todos;

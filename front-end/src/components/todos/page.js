import { useEffect, useState, useRef } from "react";
import "./style.css";
import {
  getTodosAPI,
  delTodosAPI,
  addTodosAPI,
  updateTodosAPI,
} from "../../api/todos";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState(null);
  const todoRef = useRef([]);
  const [textBtn, setTextBtn] = useState("Thêm mới");

  useEffect(() => {
    fetchData();
  }, []);

  const delTodo = async (id) => {
    if (window.confirm("Delete this ?")) {
      await delTodosAPI(id);
      setSelected(null);
      // reload list
      refreshAll();
    }
  };

  const addTodo = async (name) => {
    await addTodosAPI({
      name: name,
      isComplete: false,
    });
  };

  const updateTodo = async (name, id) => {
    await updateTodosAPI({
      name: name,
      id: id,
    });
  };

  const doneTodo = async (item) => {
    let newTodo = { ...item };
    newTodo.isComplete = true;
    await updateTodosAPI(newTodo);
    fetchData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const id = event.target[1].value;
    id === "" ? await addTodo(name) : await updateTodo(name, id);
    await refreshAll();
  };

  const fetchData = async () => {
    await getTodosAPI().then(
      function (result) {
        setTodos(result);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const refreshAll = async () => {
    const inputName = document.getElementById("name");
    const inputId = document.getElementById("id");
    inputName.value = "";
    inputId.value = null;
    await fetchData();
  };

  const changeEffect = async (id) => {
    todoRef?.current.forEach((item) => {
      if (item === null) return;
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

  console.log(todos);
  return (
    <div
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1429280430/vector/3d-calendar-marked-date-and-time-for-reminder-day-in-pink-background-calendar-with-todo-list.jpg?s=612x612&w=0&k=20&c=7IP3oPQYnEO2AHqwD8wgfqxsGFhqZGvSX9ogrEw-fZA=")`,
      }}
    >
      <main id="todolist">
        <h1 className="header-section">
          Todo List
          <span className="sologan">
            Never put off tomorrow what you can do today.
          </span>
        </h1>
        <div className="content-section">
          <div className="list-item">
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
                      onClick={() => changeEffect(item.id)}
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
          </div>
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Thêm nhiệm vụ mới</label>
              <input type="text" name="name" id="name" />
              <input
                type="number"
                name="id"
                id="id"
                style={{ display: "none" }}
              />
              <button type="submit">{textBtn}</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Todos;

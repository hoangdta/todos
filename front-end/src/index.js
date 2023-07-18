import React from "react";
import ReactDOM from "react-dom/client";
import Todos from "./components/todos";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Todos />
  </React.StrictMode>
);

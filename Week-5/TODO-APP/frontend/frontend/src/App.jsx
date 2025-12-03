import { useEffect, useState } from "react";  

import TodoInput from "./components/CreateTodo.jsx";
import TodoList from "./components/todos.jsx";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos on page load
  async function fetchTodos() {
    const res = await fetch("http://localhost:3000/todos");
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  async function addTodo(title, description) {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      fetchTodos(); // refresh
    }
  }

  // Mark complete
  async function markDone(id) {
    await fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  }

  // Delete todo
  async function deleteTodo(id) {
    await fetch("http://localhost:3000/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTodos();
  }

  return (
  <div className="container">
    <h1>Todo App</h1>
    <TodoInput onAdd={addTodo} />
    <TodoList todos={todos} onDone={markDone} onDelete={deleteTodo} />
  </div>
);
}

export default App;
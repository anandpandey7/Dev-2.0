import { useState, useEffect } from "react";
import axios from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/api/todos")
    .then((response) => {
      setTodos(response.data.todos);
    });
  }, []);

  return todos;
}

function App() {
  const todos = useTodos();

  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
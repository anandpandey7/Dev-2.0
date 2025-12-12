import React, { useEffect, useState } from "react";
import axios from "axios";

function Todos({ n }) {   // n is dynamic (comes from caller)
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = () => {
    axios
      .get("https://sum-server.100xdevs.com/todos")
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  };

  useEffect(() => {
    // fetch immediately
    fetchTodos();

    // fetch every n seconds
    const intervalId = setInterval(fetchTodos, n * 1000);

    // cleanup when n changes or component unmounts
    return () => clearInterval(intervalId);
  }, [n]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Todos (refresh every {n} sec)</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [n, setN] = useState(5); // default 5 seconds

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dynamic Polling Example</h1>

      <label>
        Refresh interval (seconds):
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
      </label>

      <hr />
      <Todos n={n} />
    </div>
  );
}

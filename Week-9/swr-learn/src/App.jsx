import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) =>
  axios.get(url).then((res) => res.data.todos);

function Todos({ n }) {
  const { data, error, isLoading } = useSWR(
    "https://sum-server.100xdevs.com/todos",
    fetcher,
    {
      refreshInterval: n * 1000,   // 🔥 dynamic polling
    }
  );

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error loading todos</h3>;

  return (
    <div>
      <h2>Todos (refresh every {n} sec)</h2>
      {data.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [n, setN] = useState(5);

  return (
    <div style={{ padding: "20px" }}>
      <h1>SWR Polling Example</h1>

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

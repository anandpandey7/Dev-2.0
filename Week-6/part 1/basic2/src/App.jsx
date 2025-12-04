import React, { useState } from 'react';

const App = () => {
  // Initialize with an array of todo objects
  const [todos, setTodos] = useState([
    { title: "Learn React", description: "Learn React Description" },
    { title: "Learn Deno", description: "Learn Deno Description" },
    { title: "Learn TypeScript", description: "Learn TypeScript Description" }
  ]);

  // Function to add new todo to the list
  function addTodos() {
    setTodos([
      ...todos,
      { title: "New Todo", description: "New Todo Description" }
    ]);
  }

  return (
    <div>
      <button onClick={addTodos}>Add Todo</button>
      {/* Render all todos */}
      {todos.map((todo, index) => (
        <Todo key={index} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
}

export default App;

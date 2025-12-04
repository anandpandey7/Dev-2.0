import React from 'react'
import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch('https://sum-server.100xdevs.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
    }, 1000);
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo 
          key={todo.id} 
          title={todo.title} 
          description={todo.description} 
        />
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

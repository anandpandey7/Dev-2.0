import React from 'react'
import { useState } from 'react'

const App = () => {
  const [todos, setTodos] = useState([{
    title: "Learn React",
    description: "Learn React from scratch",
    isCompleted: false
  },{
    title: "Study DSA",
    description: "Study Data Structures and Algorithms",
    isCompleted: false
  }]);

  function addTodo(newTodo) {
    setTodos([...todos,{
      title: newTodo.title,
      description: newTodo.description,
      isCompleted: newTodo.isCompleted
    }]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={() => addTodo({
        title: "New Todo",
        description: "Description of new todo",
        isCompleted: false
      })}>Add Todo</button>
      
      {todos.map((todo, index) => (
        <div key={index}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <p>{todo.isCompleted ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  )
}

// component



export default App
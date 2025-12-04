import {useEffect, useState} from 'react';
import axios from 'axios';

/// useEffect - for side effects (data fetching, subscriptions, or manually changing the DOM in React components)

function App() {
  const [id, setId] = useState(1);

  return (
    <div>
      <button onClick={() => setId(1)}>1</button>
      <button onClick={() => setId(2)}>2</button>
      <button onClick={() => setId(3)}>3</button>
      <Todo id={id} />
    </div>
  )
}

function Todo({ id }) {

  const [todo, setTodo] = useState({});

  useEffect(()=>{
    axios.get("https://sum-server.100xdevs.com/todo?id=" + id)
    .then((response)=>{
      setTodo(response.data.todo);
    })
    .catch((error)=>{
      console.error("Error fetching todos:", error);
    });
  },[id]);

  return (
    <div>
      <h2>
        {todo.title}
      </h2>
      <h5>
        {todo.description}
      </h5>
  </div>
  );
}

export default App;
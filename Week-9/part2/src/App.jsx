import React, { useEffect, useState } from "react";
import axios from 'axios';

// Custom hook to fetch todos
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get("YOUR_API_ENDPOINT_HERE")
      .then(res => {
        setTodos(res.data.todos);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { todos, loading };
}

// Track component to display each individual todo
function Track({ todo }) {
  return (
    <div>
      <p>{todo.title}</p>
    </div>
  );
}

// Main App component
function App() {
  const { todos, loading } = useTodos();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {todos.map((todo) => (
        <Track key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default App;


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { RecoilRoot } from "recoil";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <RecoilRoot>
//     <App />
//   </RecoilRoot>
// );




// store/todoState.js

// import { atom, selector } from "recoil";
// import axios from "axios";

// export const todosAtom = atom({
//   key: "todosAtom",
//   default: [], // base state
// });

// export const todosSelector = selector({
//   key: "todosSelector",
//   get: async () => {
//     try {
//       const res = await axios.get("YOUR_API_URL_HERE");
//       return res.data.todos;
//     } catch (err) {
//       console.error("Error fetching todos:", err);
//       return [];
//     }
//   },
// });


// import React from "react";
// import { useRecoilValueLoadable } from "recoil";
// import { todosSelector } from "./store/todoState";

// function Track({ todo }) {
//   return <p>{todo.title}</p>;
// }

// function App() {
//   const todosLoadable = useRecoilValueLoadable(todosSelector);

//   if (todosLoadable.state === "loading") {
//     return <p>Loading...</p>;
//   }
 
//   if (todosLoadable.state === "hasError") {
//     return <p>Error loading todos</p>;
//   }

//   const todos = todosLoadable.contents;

//   return (
//     <div>
//       {todos.map(todo => (
//         <Track key={todo.id} todo={todo} />
//       ))}
//     </div>
//   );
// }

// export default App;









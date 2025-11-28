import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // State refers to the current data or values held by a program or a component at a particular time.

  //   let count = 0; // this variable holds the current "state" of count

  // function increment() {
  //   count++;
  //   console.log(count);
  // }

  // increment(); // 1
  // increment(); // 2


  // In React, state is an object or a value that determines how a component renders and behaves.

  // Each React component can have its own state.

  // When the state changes, React automatically re-renders the component to reflect the new data in the UI.


  // | Concept           | Meaning                                                                                            |
  // | ----------------- | -------------------------------------------------------------------------------------------------- |
  // | **State (JS)**    | The data or variables that store the current status of a program.                                  |
  // | **State (React)** | A built-in mechanism that allows components to remember data and re-render when that data changes. |


  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App

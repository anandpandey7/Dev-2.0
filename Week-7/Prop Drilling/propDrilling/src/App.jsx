import { useState, useContext } from "react"
import { CountContext } from "./context"

function App() {
  const [count, setCount] = useState(0)

  // wrap the components with the context provider
  return (
    <CountContext.Provider value={{count, setCount}}>
      <Count />
    </CountContext.Provider>
  )
}



function Count() {
  return (
    <div>
      <CounterRenderer />
      <Buttons />
    </div>
  )
}

function CounterRenderer() {
  const { count } = useContext(CountContext)
  return <div>{count}</div>
}

function Buttons() {
  const { count, setCount } = useContext(CountContext)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  )
}

export default App
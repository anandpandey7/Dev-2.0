import React from 'react'
import { useState } from 'react'



// const App = () => {

//   const [count, setCount] = useState(0); 

//   function onclickHandler() {
//     setCount(count + 1);
//   }

//   return (
//     <div>
//       <button onClick={onclickHandler}>Counter {count}</button>
//     </div>
//   )
// }


const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter count={count} x={setCount} />
      <Counter count={count} x={setCount} />
    </div>
  )
}

// component
function Counter(props){

  function onclickHandler() {
    props.x(props.count + 1);
  }

  return (
    <div>
      <button onClick={onclickHandler}>Counter {props.count}</button>
    </div>
  ) 
}


export default App
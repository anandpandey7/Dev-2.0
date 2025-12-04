import { useEffect, useMemo, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  // const [finalValue, setFinalValue] = useState(0);

  // useEffect( () => {
  //   let count =0;
  //   for(let i=0; i<= inputValue; i++){
  //     count += i;
  //   }
  //   setFinalValue(count);
  // }, [inputValue]);

  let count = useMemo(() => {
    let sum =0;
    for(let i=0; i<= inputValue; i++){
      sum += i;
    }
    return sum;
  }, [inputValue]);

  return (
    <div>
      <input onChange={ (e)=>{ setInputValue(e.target.value);}}
       type="number"
       placeholder="sum from 0 to n">
      </input>
      <br/>
      Sum from 1 to {inputValue} is: {count}
      <br/>
      <button onClick={ () => { setCounter(counter + 1); } }>
        Counter {counter}
      </button>
    </div>
  )
}  

export default App;
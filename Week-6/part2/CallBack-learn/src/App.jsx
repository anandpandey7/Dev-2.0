import { useState } from "react"
import { memo } from 'react';

function App() {
  const [firstTitle, setFirstTitle] = useState("my name is Anand");

  function changeTitle() {
    setFirstTitle("My name is " + Math.random())
  }

  // function logFn() {
  //   console.log("click on a todo happened")
  // }

  // const logFn = useMemo(() => {
  //   return () => console.log("click on a todo happened");
  // }, []); // Empty dependency array to ensure logFn is stable

  // Use useCallback to memoize the logFn function
  const logFn = useCallback(() => {
    console.log("click on a todo happened");
  }, []); // Empty dependency array ensures logFn is stable

  return (
    <div>
      <button onClick={changeTitle}>Click me to change the title</button>
      <Header title={firstTitle} />
      <br />
      <Header title="My name is raman" logFn={logFn} />
      <Header title="My name is raman" logFn={logFn} />
      <Header title="My name is raman" logFn={logFn} />
      <Header title="My name is raman" logFn={logFn} />
    </div>
  )
}

const Header = memo(function ({title, logFn}) {
  return <div onClick={logFn}>
    {title}
  </div>
})

export default App
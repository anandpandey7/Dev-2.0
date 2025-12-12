import React, { useEffect, useState } from "react";

function App() {
  const [render, setRender] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setRender(false);
    },10000)
  },[]);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setRender(r=> !r);
  //   },5000)
  // },[]);

  return (
    <>
      {render ? <MyComponent /> : <div></div>}
    </>
  );
}

function MyComponent() {
  useEffect(() => {
    console.error("Component Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return <div>From inside my component</div>;
}

export default App;

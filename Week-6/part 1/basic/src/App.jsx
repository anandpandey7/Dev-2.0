// import React from 'react'
// import { useState } from 'react'

// const App = () => {

//   const [title, setTitle] = useState("Dynamic Part")
//   function handleClick() {
//     setTitle("New Title is" + Math.random())
//   }
//   return (
//     <>
//       <button onClick={handleClick}>Click Me</button>
//       <Header title={title}></Header>
//       <Header title="Welcome to the App!" />
//     </>
//   )
// }

// function Header({title}) {
//   return <div>
//     {title}
//   </div>
// }

// export default App

// more optimal - less rendering


// import { useState } from "react"

// function App() {
//   return (
//     <div>
//       <HeaderWithButton />
//       <Header title="My name is raman" />
//     </div>
//   )
// }

// function HeaderWithButton() {
//   const [firstTitle, setFirstTitle] = useState("my name is harkirat");

//   function changeTitle() {
//     setFirstTitle("My name is " + Math.random())
//   }

//   return <>
//     <button onClick={changeTitle}>Click me to change the title</button>
//     <Header title={firstTitle} />
//   </>
// }

// function Header({title}) {
//   return <div>
//     {title}
//   </div>
// }

// export default App


// Using Memo
import React, { useState, memo } from "react";

function App() {
  const [firstTitle, setFirstTitle] = useState("my name is harkirat");

  function changeTitle() {
    setFirstTitle("My name is " + Math.random());
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button onClick={changeTitle}>
        Click me to change the title
      </button>

      <Header title={firstTitle} />

      <br />

      <Header title="My name is raman" />
      <Header title="My name is raman" />
      <Header title="My name is raman" />
      <Header title="My name is raman" />
    </div>
  );
}

// memo will prevent re-render unless props.title changes
const Header = memo(function Header({ title }) {
  console.log("Header rendered →", title);

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "8px",
        color: "#333",
        backgroundColor: "#f5f5f5",
        borderRadius: "6px",
      }}
    >
      {title}
    </div>
  );
});

export default App;

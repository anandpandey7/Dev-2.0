import React from 'react'

const App = () => {
  return (
    <div>
      {cardWrapper({innnerComponent:<TextComponent />})}
      {cardWrapper({innnerComponent:<TextComponent />})}
      {cardWrapper({innnerComponent:<TextComponent />})}  
    </div>
  )
}

function cardWrapper({innnerComponent}) {
  return <div style={{border:"2px solid black",padding:"10px",margin:"10px"}}>
    {innnerComponent}
  </div>
}

function TextComponent() {
  return <div>
    This is a text component
  </div>
}

export default App



// proper Wrapper Component implementation

// function App() {

//   return (
//     <div style={{display: "flex"}}>
//       <Card>
//         hi there
//       </Card>
//       <Card>
//         <div>
//           hello from the 2nd card
//         </div>
//       </Card>
//     </div>
//   )
// }

// function Card({children}) {
//   return <div style={{
//     border: "1px solid black",
//     padding: 10,
//     margin: 10
//   }}>
//     {children}
//   </div>
// }

// export default App
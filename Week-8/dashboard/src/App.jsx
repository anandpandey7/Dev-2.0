import { useState } from 'react'

import { RevenueCard } from './components/RevenueCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RevenueCard
        title="Total Revenue"
        amount="2,34,000"
        orderCount={3400}
      />
    </>
  )
}

export default App

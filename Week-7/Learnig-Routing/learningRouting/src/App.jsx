import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Landing } from './components/Landing.jsx'
import { Dashboard } from './components/Dashboard.jsx'

function App() {
  return (
    <BrowserRouter>
      <InnerApp />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

function InnerApp() {
  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate("/")}>Landing</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </>
  )
}

export default App
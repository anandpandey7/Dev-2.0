import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));

function App() {
  return (
    <BrowserRouter>
      <Appbar/>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
function Appbar() {
  return (
    <div style={{ textAlign: "center", background: "#ececec", padding: "10px" }}>
      <button onClick={() => {
        window.location.href = "/";
      }}>Home</button>

      <button onClick={() => {
        window.location.href = "/about";
      }}>About</button>
    </div>
  );
}

export default App;

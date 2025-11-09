import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Admin/Login/Login"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div id="container-pages">
          <div id="container">
            <Routes>
              <Route path="/login" element={<Login/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;

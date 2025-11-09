import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Admin/Login/Login";
import Reportero from "./Admin/Reporteros/Reportero";
import { AuthProvider } from "./Context/Context";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
          <div id="container-pages">
            <div id="container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/reportero" element={<Reportero />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

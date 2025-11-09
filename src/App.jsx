import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Admin/Login/Login";
import Reportero from "./Admin/Reporteros/Reportero";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import NotFound from "./Components/NotFound/NotFound";
import Categoria from "./Pages/Categoria";
import { AuthProvider } from "./Context/Context";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <AuthProvider>
        <Router>
          <Header />
          <div id="container-pages">
            <div id="container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/reportero/*" element={<Reportero />} />
                <Route path="/categoria/:nombreCategoria" element={<Categoria />} />
                <Route path="/" element={<Main />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>

        </Router>

      </AuthProvider>

      <Footer />
    </>
  );
}

export default App;

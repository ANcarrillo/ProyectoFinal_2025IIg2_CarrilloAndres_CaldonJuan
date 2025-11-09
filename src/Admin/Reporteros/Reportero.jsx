import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavReportero from "../../Components/Nav/NavReportero";
import "../Reporteros/Reporteros.css";
import { useAuth } from "../../Context/Context";
import CrearNoticia from "../../Pages/CrearNoticia"


const Reportero = () => {
  const { user, role, loading } = useAuth();
  return (
    <div id="containerpages">
      <div id="container">
        <h2>{user?.email}</h2>
        <Routes>
          <Route path="/CrearNoticia" element={<CrearNoticia/>} />
        </Routes>
      </div>

      <div className="navReportero">
        <NavReportero />
      </div>
    </div>
  );
};

export default Reportero;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavReportero from "../../Components/Nav/NavReportero";
import "../Reporteros/Reporteros.css";
import { useAuth } from "../../Context/Context";
import CrearNoticia from "../../Pages/CrearNoticia/CrearNoticia"
import HistorialNoticia from "../../Pages/HistorialNoticias/HistorialNoticia";
import EditarNoticia from "../../Pages/CrearNoticia/EditarNoticia";


const Reportero = () => {
  const { user, role, loading } = useAuth();
  return (
    <div id="containerpages">
      <div id="container">
        <h2>{user?.email}</h2>
        <Routes>
          <Route index element={<HistorialNoticia />} />
          <Route path="CrearNoticia" element={<CrearNoticia/>} />
          <Route path="Historial" element={<HistorialNoticia />} />
          <Route path="EditarNoticia/:id" element={<EditarNoticia />} />
        </Routes>
      </div>

      <div className="navReportero">
        <NavReportero />
      </div>
    </div>
  );
};

export default Reportero;

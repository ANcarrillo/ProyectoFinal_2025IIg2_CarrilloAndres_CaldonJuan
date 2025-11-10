import React from 'react'
import { useAuth } from "../../Context/Context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavEditor from '../../Components/Nav/NavEditor';
import CrearNoticia from "../../Pages/CrearNoticia/CrearNoticia"
import HistorialNoticia from "../../Pages/HistorialNoticias/HistorialNoticiasEditor";
import EditarNoticia from "../../Pages/CrearNoticia/EditarNoticiaEditor";
import "./Editor.css"


const Editor = () => {
    const { user, role, loading } = useAuth();
  return (
    <div id="containerpages">
      <div id="container">
        <Routes>
          <Route index element={<HistorialNoticia />} />
          <Route path="CrearNoticia" element={<CrearNoticia/>} />
          <Route path="Historial" element={<HistorialNoticia />} />
          <Route path="EditarNoticia/:id" element={<EditarNoticia />} />
        </Routes>
      </div>

      <div className="navReportero">
        <NavEditor />
      </div>
    </div>
  )
}

export default Editor

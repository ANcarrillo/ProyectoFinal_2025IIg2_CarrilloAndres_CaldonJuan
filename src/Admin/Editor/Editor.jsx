import React from 'react'
import { useAuth } from "../../Context/Context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavEditor from '../../Components/Nav/NavEditor';
import "./Editor.css"


const Editor = () => {
    const { user, role, loading } = useAuth();
  return (
    <div id="containerpages">
      <div id="container">
        <Routes>
          <Route path="/*" element={<h2>texto</h2>} />
        </Routes>
      </div>

      <div className="navReportero">
        <NavEditor />
      </div>
    </div>
  )
}

export default Editor

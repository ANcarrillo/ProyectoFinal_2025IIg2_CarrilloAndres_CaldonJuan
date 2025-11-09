import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUserEmailPassword } from "../../Data/Login";
import "./Login.css";
import FactoryIcon from "@mui/icons-material/Factory";
import { db } from "../../Data/config";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [credencials, setCredencials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const searchRole = async (uid) => {
    const docRef = doc(db, `Usuarios/${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().Rol;
    } else {
      throw new Error("No se encontró el usuario en Firestore");
    }
  };

  const autenticacion = async (e) => {
    e.preventDefault();

    try {
      const user = await LoginUserEmailPassword(
        credencials.email,
        credencials.password
      );
      console.log("Usuario autenticado:", user.email);

      const rol = await searchRole(user.uid);
      console.log("Rol del usuario:", rol);

      // Navegar según el rol
      if (rol === "Periodista") {
        navigate("/reportero");
      } else {
        alert("Aún no se conecta la respectiva página para este rol");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="contenedorLogin">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-container">
            <FactoryIcon />
          </div>
          <h2>Bienvenido</h2>
        </div>

        <form className="login-form" onSubmit={autenticacion}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={credencials.email}
              onChange={(e) =>
                setCredencials((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={credencials.password}
              onChange={(e) =>
                setCredencials((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-footer">
          <h4>
            ¿Deseas formar parte de nosotros?<br />
            <a href="#solicitud">Mándanos tu solicitud</a>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
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
      <h2>LOGIN</h2>
      <FactoryIcon />
      <form onSubmit={autenticacion}>
        <input
          type="email"
          placeholder="User@example.com"
          value={credencials.email}
          onChange={(e) =>
            setCredencials((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credencials.password}
          onChange={(e) =>
            setCredencials((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <button type="submit">Login</button>
      </form>
      <h4>¿Deseas formar parte de nosotros? Mándanos tu solicitud</h4>
    </div>
  );
};

export default Login;

import { React, useState, useEffect } from "react";
import { LoginUserEmailPassword } from "../../Data/Login";
import "./Login.css";
import FactoryIcon from "@mui/icons-material/Factory";
import { db } from "../../Data/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [credencials, setCredencials] = useState({
    email: "",
    password: "",
    rol: "",
  });

  const searchRole = async (udi) => {
    const docRef = doc(db, `Usuarios/${udi}`);
    const docSnap = await getDoc(docRef);
    const ususario = docSnap.data().Rol;
    return ususario;
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
      setCredencials((prev) => ({ ...prev, rol }));

      console.log("Rol del usuario:", rol);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.errorMessage);
    }
  };

  return (
    <div>
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
          />
          <input
            type="password"
            placeholder="Password"
            value={credencials.password}
            onChange={(e) =>
              setCredencials((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button type="submit">Login</button>
        </form>
        <h4>¿Deseas formar parte de nosotros? Mándanos tu solicitud</h4>
      </div>
    </div>
  );
};

export default Login;

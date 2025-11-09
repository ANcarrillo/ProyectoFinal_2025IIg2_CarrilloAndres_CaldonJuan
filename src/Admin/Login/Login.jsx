import { React, useState, useEffect } from "react";
import { LoginUserEmailPassword } from "../../Data/Login";
import "./Login.css";
import FactoryIcon from "@mui/icons-material/Factory";

const Login = () => {
  const [credencials, setCredencials] = useState({
    email: "",
    password: "",
  });

  const autenticacion = (e) => {
    e.preventDefault();
    LoginUserEmailPassword(credencials.email, credencials.password)
      .then((user) => {
        console.log("Usuario autenticado:", user);
        setCredencials({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error.errorMessage);
      });
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

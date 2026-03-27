import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fondo from "../../assets/img/FondoMovilREMI.jpeg";

function Login() {
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("documento", data.documento);
      localStorage.setItem("nombreUsuario", data.nombre);


      
      switch (data.rol) {
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Vendedor":
          navigate("/vendedor/dashboard");
          break;
        default:
          throw new Error("Rol no reconocido");
      }
    } catch (error) {
      alert(`Login fallido: ${error.message}`);
    }
  };

  return (
  <div
    style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    }}
  >
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>
        <p className="login-welcome">Bienvenido, ingresa tus credenciales</p>

        <input
          type="text"
          placeholder="Documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Ingresar
        </button>
      </div>
    </div>
  </div>
);
}

export default Login;

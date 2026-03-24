import React from "react";
import { Card } from "react-bootstrap";
import "./Perfil.css";

function Perfil() {
  const nombre = localStorage.getItem("nombreUsuario");
  const rol = localStorage.getItem("rol");
  const documento = localStorage.getItem("documento");

  return (
    <div className="perfil-container">
      <Card className="perfil-card">
        <Card.Body>
          <div className="text-center mb-3">
            <img
              src="/src/assets/img/default-avatar.png"
              alt="avatar"
              className="perfil-avatar"
            />
          </div>
          <Card.Title className="text-center">👤 Perfil del Usuario</Card.Title>
          <hr />
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Rol:</strong> {rol}</p>
          <p><strong>Documento:</strong> {documento}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Perfil;

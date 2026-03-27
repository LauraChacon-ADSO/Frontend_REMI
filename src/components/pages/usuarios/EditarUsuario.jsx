import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const EditarUsuario = () => {
  const { documento } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    tipoDocumentoUsuario: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    codigoNivel: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/Auth/usuarios/${documento}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Error al obtener usuario");
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("❌ Error cargando usuario:", error);
      }
    };
    fetchUsuario();
  }, [documento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      TipoDocumentoUsuario: usuario.tipoDocumentoUsuario,
      NombreUsuario: usuario.nombreUsuario,
      ApellidoUsuario: usuario.apellidoUsuario,
      CorreoUsuario: usuario.correoUsuario,
      CodigoNivel: parseInt(usuario.codigoNivel, 10),
      Password: usuario.password,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7052/api/Auth/usuarios/${documento}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar usuario");

      alert("✅ Usuario actualizado correctamente");
      navigate("/admin/usuarios-lista");
    } catch (error) {
      console.error("❌ Error actualizando usuario:", error);
      alert("❌ Error al actualizar usuario");
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={8} lg={6}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h3 className="mb-4 text-center text-primary fw-bold">
              ✏️ Editar Usuario
            </h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Select
                  name="tipoDocumentoUsuario"
                  value={usuario.tipoDocumentoUsuario || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="NIT">NIT</option>
                  <option value="PAS">Pasaporte</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreUsuario"
                  value={usuario.nombreUsuario || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidoUsuario"
                  value={usuario.apellidoUsuario || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correoUsuario"
                  value={usuario.correoUsuario || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="codigoNivel"
                  value={usuario.codigoNivel || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="1">Administrador</option>
                  <option value="2">Vendedor</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nueva Contraseña (opcional)</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={usuario.password || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                💾 Guardar Cambios
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditarUsuario;

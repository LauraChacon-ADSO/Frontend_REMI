import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const AgregarUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    documento: "",
    tipoDocumento: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    codigoNivel: "", 
  });

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
      Documento: usuario.documento.toString(),
      TipoDocumento: usuario.tipoDocumento,
      Nombre: usuario.nombre,
      Apellido: usuario.apellido,
      Correo: usuario.correo,
      Password: usuario.password,
      CodigoNivel: parseInt(usuario.codigoNivel, 10),
    };

    console.log("📦 Payload enviado:", payload);

    try {
      const response = await fetch("https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("✅ Usuario creado exitosamente");
      navigate("/admin/usuarios-lista");
    } catch (error) {
      console.error("❌ Error creando usuario:", error);
      alert("❌ Error al crear usuario: " + error.message);
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={8} lg={6}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h3 className="mb-4 text-center text-primary fw-bold">
              ➕ Crear Nuevo Usuario
            </h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Documento</Form.Label>
                <Form.Control
                  type="text"
                  name="documento"
                  value={usuario.documento}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Select
                  name="tipoDocumento"
                  value={usuario.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={usuario.nombre}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      value={usuario.apellido}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={usuario.correo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={usuario.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="codigoNivel"
                  value={usuario.codigoNivel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="1">Administrador</option>
                  <option value="2">Vendedor</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button type="submit" variant="primary">
                  💾 Guardar Usuario
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AgregarUsuario;

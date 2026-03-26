import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import clienteService from '/src/services/apiCliente.js';

import { Form, Button, Card, Row, Col } from "react-bootstrap";

const AgregarCliente = () => {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    documentoCliente: "",
    tipoDocumentoCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    correoCliente: "",
    telefonoCliente: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let telefonoFormateado = null;

    if (cliente.telefonoCliente) {
      telefonoFormateado = `(+57) ${cliente.telefonoCliente}`;
    }

    const payload = {
      documentoCliente: String(cliente.documentoCliente),
      tipoDocumentoCliente: cliente.tipoDocumentoCliente,
      nombreCliente: cliente.nombreCliente,
      apellidoCliente: cliente.apellidoCliente,
      correoCliente: cliente.correoCliente,
      telefonoCliente: telefonoFormateado,
      estadoCliente: true,
    };

    console.log("📦 Payload enviado:", payload);

    try {
      await clienteService.crearCliente(payload);
      alert("✅ Cliente creado exitosamente");
      navigate("/admin/clientes-lista");
    } catch (error) {
      console.error("❌ Error creando cliente:", error);
      alert("❌ " + error.message);
    }
  };


  return (
    <Row className="justify-content-center mt-5">
      <Col md={8} lg={6}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h3 className="mb-4 text-center text-primary fw-bold">
              ➕ Crear Nuevo Cliente
            </h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Documento</Form.Label>
                <Form.Control
                  type="text" // 👈 NO number
                  name="documentoCliente"
                  value={cliente.documentoCliente}
                  onChange={handleChange}
                  placeholder="Ej: 1234567890"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Select
                  name="tipoDocumentoCliente"
                  value={cliente.tipoDocumentoCliente}
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

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombreCliente"
                      value={cliente.nombreCliente}
                      onChange={handleChange}
                      placeholder="Ej: Juan"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellidoCliente"
                      value={cliente.apellidoCliente}
                      onChange={handleChange}
                      placeholder="Ej: Pérez"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correoCliente"
                  value={cliente.correoCliente}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text" // 👈 NO number
                  name="telefonoCliente"
                  value={cliente.telefonoCliente}
                  onChange={handleChange}
                  placeholder="(+57) 3XXXXXXXXX"
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary">
                  💾 Guardar Cliente
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AgregarCliente;
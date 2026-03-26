import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import clienteService from '/src/services/apiCliente.js';

const EditarCliente = () => {
  const { documentoCliente } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarCliente = async () => {
      try {
        const data = await clienteService.getClientePorId(documentoCliente);
        setCliente(data);
      } catch (err) {
        setError("Error al cargar el cliente");
      } finally {
        setLoading(false);
      }
    };
    cargarCliente();
  }, [documentoCliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteService.actualizarCliente(documentoCliente, cliente);
      navigate("/admin/clientes-lista");
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Error al actualizar el cliente");
      }
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!cliente) return null;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h3 className="mb-4 text-center text-primary">
                ✏️ Editar Cliente
              </h3>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Tipo Documento</Form.Label>
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
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombreCliente"
                        value={cliente.nombreCliente}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidoCliente"
                        value={cliente.apellidoCliente}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        type="email"
                        name="correoCliente"
                        value={cliente.correoCliente}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="text"
                        name="telefonoCliente"
                        value={cliente.telefonoCliente}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button type="submit" variant="primary"
                  onClick={() => navigate("/clientes-lista")}>
                    💾 Guardar Cambios
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/admin/clientes-lista")}
                  >
                    ❌ Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarCliente;
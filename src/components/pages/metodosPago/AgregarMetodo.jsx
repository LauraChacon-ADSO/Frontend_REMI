import React, { useState } from "react";
import metodoService from "/src/services/metodoService";
import { Form, Button, Container, Card } from "react-bootstrap";

function AgregarMetodoPago() {
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      await metodoService.crearMetodo({ nombreFormaPago: nombre });
      alert("Método agregado con éxito ✅");
      setNombre("");
    } catch (err) {
      console.error("Error al agregar:", err);
      alert("Error al agregar método");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="text-center mb-3">➕ Agregar Método de Pago</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Método</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Efectivo, Tarjeta, Transferencia"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="success">
              Guardar
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default AgregarMetodoPago;
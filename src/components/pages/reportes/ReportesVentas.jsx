import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function ReportesVentas() {
  const [ventas, setVentas] = useState([]);
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      
      let url = "https://localhost:7052/api/ventas";
      if (mes && anio) {
        url += `?mes=${mes}&anio=${anio}`;
      }

      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const ordenadas = data.sort((a, b) => b.totalVenta - a.totalVenta);
      setVentas(ordenadas);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>📊 Reporte de Ventas</h2>

      {/* 🔹 Filtros */}
      <Card className="mb-3 p-3">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Mes</Form.Label>
              <Form.Select value={mes} onChange={(e) => setMes(e.target.value)}>
                <option value="">Todos</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 2026"
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button variant="primary" onClick={fetchData}>
              Filtrar
            </Button>
          </Col>
        </Row>
      </Card>

      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total Venta</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v, index) => (
            <tr key={index}>
              <td>{v.nombreCliente}</td>
              <td>{new Date(v.fechaVenta).toLocaleDateString()}</td>
              <td>${v.totalVenta.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

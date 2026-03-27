import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import axios from "axios";

export default function ReporteProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const { data } = await axios.get("/api/productos", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchData();
  }, []);

  // Ordenar por ventas 
  const masVendidos = [...productos]
    .sort((a, b) => (b.salidaProducto ?? 0) - (a.salidaProducto ?? 0))
    .slice(0, 10);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>🔥 Productos Más Vendidos</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody>
                  {masVendidos.map((p, index) => (
                    <tr key={index}>
                      <td>{p.nombreProducto}</td>
                      <td>{p.salidaProducto ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

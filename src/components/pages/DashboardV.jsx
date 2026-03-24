import { Card, Row, Col, Container } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  
  const data = [
    { mes: "Enero", ventas: 10200000 },
    { mes: "Febrero", ventas: 11200000 },
    { mes: "Marzo", ventas: 12200000 },
    { mes: "Abril", ventas: 13200000 },
    { mes: "Mayo", ventas: 14200000 },
  ];

  // 👇 Obtén el rol desde localStorage
  const role = localStorage.getItem("rol");

  return (
    <Container fluid>
      {/* Tarjetas de métricas */}
      <Row className="mb-4">
        {/* Solo mostrar Usuarios si el rol es Admin */}
        {role === "Admin" && (
          <Col md={3}>
            <Card className="shadow-sm text-center bg-primary text-white">
              <Card.Body>
                <Card.Title>Usuarios</Card.Title>
                <h3>150</h3>
              </Card.Body>
            </Card>
          </Col>
        )}

        <Col md={3}>
          <Card className="shadow-sm text-center bg-success text-white">
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <h3>320</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center bg-warning text-white">
            <Card.Body>
              <Card.Title>Pedidos</Card.Title>
              <h3>87</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center bg-danger text-white">
            <Card.Body>
              <Card.Title>Recibos</Card.Title>
              <h3>45</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráfico de ventas */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">Dinero Vendido</Card.Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#646cff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;

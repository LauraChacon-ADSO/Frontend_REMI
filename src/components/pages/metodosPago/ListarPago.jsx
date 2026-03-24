import React, { useEffect, useState } from "react";
import metodoService from "/src/services/metodoService";
import { Button, Table, Container, Spinner } from "react-bootstrap";

function ListarMetodosPago() {
  const [metodos, setMetodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarMetodos = async () => {
    try {
      const data = await metodoService.getMetodos();
      setMetodos(data);
    } catch (err) {
      console.error("Error cargando métodos:", err);
      alert("Error cargando métodos de pago");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMetodos();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">💳 Métodos de Pago</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre Método</th>
            </tr>
          </thead>
          <tbody>
            {metodos.length > 0 ? (
              metodos.map((m, i) => (
                <tr key={m.codigoFormaPago}>
                  <td>{i + 1}</td>
                  <td>{m.nombreFormaPago}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No hay métodos de pago registrados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ListarMetodosPago;

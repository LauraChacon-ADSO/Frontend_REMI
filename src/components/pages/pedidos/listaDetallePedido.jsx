import React, { useEffect, useState } from "react";
import { obtenerPedidos } from "/src/services/detallePedidoService.js";
import { Button, Modal, Spinner } from "react-bootstrap";

export default function ListaDetallePedido() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await obtenerPedidos();
        setPedidos(data);
      } catch (error) {
        console.error("No se pudieron cargar los pedidos", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  const handleVer = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Cargando pedidos...</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Lista de Pedidos</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Código Pedido</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido, index) => (
              <tr key={pedido.codigoPedido}>
                <td>{index + 1}</td>
                <td><strong>{pedido.codigoPedido}</strong></td>
                <td>{pedido.documentoCliente}</td>
                <td>{pedido.fechaPedido}</td>
                <td>{pedido.horaPedido}</td>
                <td>
                  <span className="badge bg-secondary">{pedido.estadoPedido}</span>
                </td>
                <td>
                  {pedido.valorPedido
                    ? `$${pedido.valorPedido.toLocaleString()}`
                    : "---"}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleVer(pedido)}
                  >
                    👁 Ver
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No hay pedidos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Factura */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Factura del Pedido</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {pedidoSeleccionado && (
            <div className="factura p-3 border rounded">
              <h5 className="text-center mb-3">
                Pedido #{pedidoSeleccionado.codigoPedido}
              </h5>

              <div className="d-flex justify-content-between">
                <p><strong>Cliente:</strong> {pedidoSeleccionado.documentoCliente}</p>
                <p><strong>Estado:</strong> {pedidoSeleccionado.estadoPedido}</p>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <p><strong>Fecha:</strong> {pedidoSeleccionado.fechaPedido}</p>
                <p><strong>Hora:</strong> {pedidoSeleccionado.horaPedido}</p>
              </div>

              <hr />
              <h6>Productos:</h6>

              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Nombre</th>
                    <th>Precio Docena</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidoSeleccionado.detallesP?.map((d, i) => (
                    <tr key={i}>
                      <td>{d.codigoProducto}</td>
                      <td>{d.cantidadProducto}</td>
                      <td>{d.nombreProducto}</td>
                      <td>${d.valorProducto.toLocaleString()}</td>
                      <td>${d.totalPagoProducto.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />
              <h5 className="text-end">
                Total: ${pedidoSeleccionado.valorPedido.toLocaleString()}
              </h5>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
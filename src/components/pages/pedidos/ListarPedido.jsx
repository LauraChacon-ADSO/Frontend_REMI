import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Alert,
  Form,
  Modal,
} from "react-bootstrap";
import { eliminarPedido, editarPedido } from "/src/services/apiPedido";
import pedidoService from "/src/services/pedidoService"; 

const ListarPedidoConModal = () => {
  const [pedidos, setPedidos] = useState([]);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pedidosPorPagina] = useState(10);
  const [pedidosOriginales, setPedidosOriginales] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imprimirFactura, setImprimirFactura] = useState(false);

  const [showPagoModal, setShowPagoModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [valorRecibido, setValorRecibido] = useState("");
  const [cambio, setCambio] = useState(0);

  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);
  const navigate = useNavigate();

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const data = await pedidoService.getPedidos();
      setPedidos(data);
      setPedidosOriginales(data);
      setError(null);
    } catch (error) {
      setError("Error al cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      if (idBusqueda.trim() === "") {
        setPedidos(pedidosOriginales);
        return;
      }

      const timeout = setTimeout(async () => {
        try {
          let resultados = [];

          if (!isNaN(idBusqueda)) {
            const pedido = await pedidoService.getPedidoPorId(idBusqueda);
            resultados = pedido ? [pedido] : [];
          } else {
            const filtro = idBusqueda.toLowerCase();

            resultados = pedidosOriginales.filter(p => {
              const nombre = p.nombreCliente?.toLowerCase() || "";
              const apellido = p.apellidoCliente?.toLowerCase() || "";
              const nombreCompleto = `${nombre} ${apellido}`;

              return (
                nombre.includes(filtro) ||
                apellido.includes(filtro) ||
                nombreCompleto.includes(filtro)
              );
            });
          }

          setPedidos(resultados);
          setPaginaActual(1);
          setError(null);
        } catch {
          setPedidos([]);
        }
      }, 400);

      return () => clearTimeout(timeout);
    }, [idBusqueda, pedidosOriginales]);

  const handleVer = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  const handleEliminarPedido = async (codigoPedido) => {
    if (!window.confirm("¿Seguro que deseas eliminar este pedido?")) return;

    try {
      await eliminarPedido(codigoPedido);
      setPedidos((prev) =>
        prev.filter((p) => p.codigoPedido !== codigoPedido)
      );
      alert("✅ Pedido eliminado correctamente");
    } catch (error) {
      alert("❌ Error al eliminar el pedido");
    }
  };

  const handleMarcarCompletado = async () => {
    if (!pedidoSeleccionado) return;

    try {
      const pedidoActualizado = {
        ...pedidoSeleccionado,
        estadoPedido: "Completado",
      };

      await editarPedido(
        pedidoSeleccionado.codigoPedido,
        pedidoActualizado
      );

      setPedidos((prev) =>
        prev.map((p) =>
          p.codigoPedido === pedidoSeleccionado.codigoPedido
            ? pedidoActualizado
            : p
        )
      );

      setPedidoSeleccionado(pedidoActualizado);

      alert("✅ Pedido marcado como Completado");
    } catch (error) {
      alert("❌ Error al actualizar el estado");
    }
  };



  const handleAbrirPago = () => {
    setShowPagoModal(true);
  };

  const handleEditar = (codigoPedido) => {
  navigate(`editar-pedido/${codigoPedido}`);
};

useEffect(() => {
  if (pedidoSeleccionado && valorRecibido) {
    const total = pedidoSeleccionado.valorPedido;
    const recibido = Number(valorRecibido);

    if (!isNaN(recibido)) {
      setCambio(recibido - total);
    }
  }
}, [valorRecibido, pedidoSeleccionado]);

  const handleRegistrarPago = async () => {
    if (!metodoPago || !valorPago) {
      alert("⚠️ Debes seleccionar un método y un valor.");
      return;
    }

    try {
      // await pagoService.registrarPago(pedidoSeleccionado.codigoPedido, { metodoPago, valorPago });

      console.log("Pago registrado:", {
        pedido: pedidoSeleccionado.codigoPedido,
        metodo: metodoPago,
        valor: valorPago,
      });

      alert("✅ Pago registrado con éxito");

      setShowPagoModal(false);
      setMetodoPago("");
      setValorPago("");
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar pago");
    }
  };

  const imprimirFacturaEnNuevaPestana = () => {
  if (!pedidoSeleccionado) return;

  const ventana = window.open("", "_blank");

  const html = `
    <html>
      <head>
        <title>Factura Pedido ${pedidoSeleccionado.codigoPedido}</title>
        <style>
          body {
            font-family: Arial;
            padding: 20px;
          }
          h2, h3 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
          }
          .total {
            text-align: right;
            margin-top: 10px;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <h1>Inversiones Herrera Chacón S.A.S.</h1>
        <h2>Factura</h2>
        <h3>Pedido #${pedidoSeleccionado.codigoPedido}</h3>

        <p>
          <strong>Cliente:</strong> 
          ${pedidoSeleccionado.nombreCliente} ${pedidoSeleccionado.apellidoCliente || ""}
        </p>

        <p>
          <strong>Fecha:</strong> 
          ${pedidoSeleccionado.fechaPedido}
        </p>

        <p>
          <strong>Hora:</strong> 
          ${pedidoSeleccionado.horaPedido?.substring(0,5)}
        </p>

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${pedidoSeleccionado.detallesP
              ?.map(
                (p) => `
              <tr>
                <td>${p.codigoProducto}</td>
                <td>${p.nombreProducto}</td>
                <td>${p.cantidadProducto}</td>
                <td>$${p.valorProducto.toLocaleString()}</td>
                <td>$${p.totalPagoProducto.toLocaleString()}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="total">
          <strong>Total: $${pedidoSeleccionado.valorPedido.toLocaleString()}</strong>
        </div>

        <p><strong>Pago con:</strong> $${Number(valorRecibido).toLocaleString()}</p>
        <p><strong>Cambio:</strong> $${cambio.toLocaleString()}</p>

        <p style="text-align:center; margin-top:20px;">
          ¡Gracias por tu compra!<br/>
          Vuelve pronto
        </p>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>

      </body>
    </html>
  `;

  ventana.document.write(html);
  ventana.document.close();
};

  const pedidosPaginados = pedidos.slice(
    (paginaActual - 1) * pedidosPorPagina,
    paginaActual * pedidosPorPagina
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const formatearFecha = (fecha) =>
    fecha ? new Date(fecha).toLocaleDateString("es-CO") : "---";

  const formatearHora = (hora) =>
    hora ? hora.substring(0, 5) : "---"; 


  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold text-primary">📋 Lista de Pedidos</h2>
          <p className="text-muted">
            Aquí puedes visualizar, buscar y gestionar los pedidos.
          </p>
        </Col>
      </Row>

      {/* Buscar pedido */}
      <Form className="mb-4">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar pedido por ID o nombre del cliente"
              value={idBusqueda}
              onChange={(e) => setIdBusqueda(e.target.value)}
            />
          </Col>
        </Row>
      </Form>

      {/* Tabla */}
      <Table bordered hover responsive className="shadow-sm">
        <thead className="table-primary text-center">
          <tr>
            <th>Código Pedido</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="align-middle text-center">
          {pedidosPaginados.length > 0 ? (
            pedidosPaginados.map((pedido, index) => (
              <tr key={pedido.codigoPedido}>
                <td className="fw-bold">{pedido.codigoPedido}</td>
                <td>{pedido.nombreCliente + " " + pedido.apellidoCliente}</td>
                <td>{formatearFecha(pedido.fechaPedido)}</td>
                <td>{formatearHora(pedido.horaPedido)}</td>
                <td>
                  <span
                    className={`badge ${
                      pedido.estadoPedido === "Entregado"
                        ? "bg-success"
                        : pedido.estadoPedido === "Pendiente"
                        ? "bg-warning text-dark"
                        : pedido.estadoPedido === "Completado"
                        ? "bg-info"
                        : "bg-secondary"
                    }`}
                  >
                    {pedido.estadoPedido}
                  </span>
                </td>
                <td>
                  {pedido.valorPedido
                    ? `$${pedido.valorPedido.toLocaleString("es-CO")}`
                    : "---"}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleVer(pedido)}
                  >
                    👁 Ver
                  </Button>
                <Button 
                    variant="warning"
                    size="sm"
                    className="me-2"  onClick={() => {
                      navigate(`../editar-pedido/${pedido.codigoPedido}`);
                    }}>
                  ✏️ Editar
                </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminarPedido(pedido.codigoPedido)}
                  >
                    🗑 Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted py-3">
                No hay pedidos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        <Button
          variant="outline-primary"
          disabled={paginaActual === 1}
          onClick={() => cambiarPagina(paginaActual - 1)}
        >
          ⬅ Anterior
        </Button>
        <span className="align-self-center fw-semibold">
          Página {paginaActual} de {totalPaginas}
        </span>
        <Button
          variant="outline-primary"
          disabled={paginaActual === totalPaginas}
          onClick={() => cambiarPagina(paginaActual + 1)}
        >
          Siguiente ➡
        </Button>
      </div>

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
                <p>
                  <strong>Cliente:</strong>{" "}
                  {pedidoSeleccionado.nombreCliente}
                </p>
                <p>
                  <strong>Estado:</strong> {pedidoSeleccionado.estadoPedido}
                </p>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatearFecha(pedidoSeleccionado.fechaPedido)}
                </p>
                <p>
                  <strong>Hora:</strong>{" "}
                  {formatearHora(pedidoSeleccionado.horaPedido)}
                </p>
              </div>

              <hr />
              <h6>Productos:</h6>

              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Nombre</th>
                    <th>Precio Unitario</th>
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
              </Table>

              <hr />
              <h5 className="text-end">
                Total: ${pedidoSeleccionado.valorPedido.toLocaleString()}
              </h5>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {pedidoSeleccionado?.estadoPedido === "Pendiente" && (
            <Button variant="warning" onClick={handleMarcarCompletado}>
               Marcar como Completado
            </Button>
          )}
          {pedidoSeleccionado?.estadoPedido === "Completado" && (
            <Button variant="success" onClick={handleAbrirPago}>
               Registrar Pago
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPagoModal}
        onHide={() => setShowPagoModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar Pago</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {pedidoSeleccionado && (
            <div className="card p-3 shadow-sm">

              <h5 className="text-center mb-3">
                Pedido #{pedidoSeleccionado.codigoPedido}
              </h5>

              <div className="mb-2">
                <label>Total a pagar</label>
                <input
                  className="form-control"
                  value={`$ ${pedidoSeleccionado.valorPedido.toLocaleString()}`}
                  readOnly
                />
              </div>

              <div className="mb-2">
                <label>¿Con cuánto paga?</label>
                <input
                  type="text"
                  className="form-control"
                  value={valorRecibido}
                  onChange={(e) => {
                    const valor = e.target.value.replace(/\D/g, "");
                    setValorRecibido(valor);
                  }}
                />
              </div>

              <div className="mb-2">
                <label>Cambio</label>
                <input
                  className="form-control"
                  value={`$ ${cambio >= 0 ? cambio.toLocaleString() : 0}`}
                  readOnly
                />
              </div>

              {cambio < 0 && (
                <p className="text-danger mt-2">
                  ⚠️ El dinero no alcanza
                </p>
              )}

              <div className="form-check form-switch mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={imprimirFactura}
                  onChange={(e) => setImprimirFactura(e.target.checked)}
                />
                <label className="form-check-label">
                  Imprimir factura automáticamente
                </label>
              </div>

            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowPagoModal(false)}
          >
            Cancelar
          </button>

          <button
          className="btn btn-success"
          onClick={() => {
            setShowPagoModal(false);

            if (imprimirFactura) {
              imprimirFacturaEnNuevaPestana();
            }

            navigate("/admin/listar-pedido");

            setValorRecibido("");
            setCambio(0);
            setImprimirFactura(false);
          }}
        >
          Confirmar Pago
        </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListarPedidoConModal;

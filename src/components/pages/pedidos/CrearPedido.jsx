import React, { useState } from "react";
import {
  buscarCliente,
  crearPedido,
  buscarProducto,
} from "/src/services/apiPedido.js"; 
import "bootstrap/dist/css/bootstrap.min.css";

function CrearPedido() {
  const [documentoCliente, setDocumentoCliente] = useState("");
  const [cliente, setCliente] = useState(null);

  const [codigoPedido, setCodigoPedido] = useState("");
  const [fechaPedido, setFechaPedido] = useState("");
  const [horaPedido, setHoraPedido] = useState("");
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    codigoProducto: "",
    nombreProducto: "",
    cantidadProducto: 1,
    precioProducto: 0,
    totalPagoProducto: 0,
  });

  // Calcular total del pedido
  const valorPedido = productos.reduce(
    (total, p) => total + p.totalPagoProducto,
    0
  );

  // Buscar cliente
  const handleBuscarCliente = async () => {
    try {
      const data = await buscarCliente(documentoCliente);
      console.log("Cliente encontrado:", data);
      setCliente(data);

      const ahora = new Date();
      setFechaPedido(ahora.toISOString().split("T")[0]);
      setHoraPedido(ahora.toLocaleTimeString());
    } catch {
      alert("Cliente no encontrado");
      setCliente(null);
    }
  };

  // Buscar producto
  const handleBuscarProducto = async () => {
    if (!producto.codigoProducto) {
      alert("Ingrese código de producto");
      return;
    }
    try {
      const data = await buscarProducto(producto.codigoProducto);
      console.log("Producto encontrado:", data);

      setProducto({
        ...producto,
        codigoProducto: data.id ?? data.codigoProducto, 
        nombreProducto: data.nombreProducto ?? data.desc_producto ?? "", 
        precioProducto: data.precioProducto ?? data.valorProducto ?? 0,
      });
    } catch (err) {
      console.error(err);
      alert("Producto no encontrado");
    }
  };

  // Agregar producto
  const handleAgregarProducto = () => {
    if (!producto.codigoProducto || producto.precioProducto <= 0) {
      alert("Debes ingresar código válido de producto");
      return;
    }

    const nuevoProducto = {
      ...producto,
      totalPagoProducto: producto.cantidadProducto * producto.precioProducto,
    };

    setProductos([...productos, nuevoProducto]);
    setProducto({
      codigoProducto: "",
      nombreProducto: "",
      cantidadProducto: 1,  
      precioProducto: 0,
      totalPagoProducto: 0,
    });
  };

  const handleGuardarPedido = async () => {
  if (!documentoCliente || productos.length === 0) {
    alert("Debe seleccionar un cliente y al menos un producto.");
    return;
  }

  const pedido = {
    codigoPedido, // puede venir vacío si lo genera el backend
    fechaPedido,
    horaPedido,
    documentoCliente,
    estadoPedido,
    valorPedido,
    detallesP: productos.map((p) => ({
      codigoProducto: p.codigoProducto,
      cantidadProducto: p.cantidadProducto,
      valorProducto: p.precioProducto,  
      totalPagoProducto: p.totalPagoProducto,
    })),
  };

  try {
    const result = await crearPedido(pedido);
    alert("✅ Pedido creado con código: " + result.codigoPedido);

    // limpiar formulario
    setProductos([]);
    setCliente(null);
    setDocumentoCliente("");
    setCodigoPedido("");
  } catch (error) {
    console.error("❌ Error al guardar pedido:", error);
    alert("Error al guardar pedido");
  }
};

  return (
    <div className="container mt-4">
      <h2>Crear Pedido</h2>

      {/* Buscar Cliente */}
      <div className="card p-3 mb-3">
        <h5>Buscar Cliente</h5>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Documento Cliente"
            value={documentoCliente}
            onChange={(e) => setDocumentoCliente(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleBuscarCliente}>
            Buscar
          </button>
        </div>
        {cliente && (
          <div className="card mt-3 p-3">
            <h5 className="mb-3">Datos del Cliente</h5>
            <div className="row">
              {[
                ["documentoCliente", "Documento"],
                ["nombreCliente", "Nombre"],
                ["correoCliente", "Email"],
                ["telefonoCliente", "Teléfono"],
              ].map(([key, label]) => (
                <div className="col-md-6 mb-2" key={key}>
                  <strong>{label}:</strong> {cliente[key]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Datos Pedido */}
      {cliente && (
        <div className="card p-3 mb-3">
          <h5>Datos del Pedido</h5>
          <div className="row">
            <div className="col-md-4">
              <label>Código Pedido</label>
              <input
                type="text"
                className="form-control"
                value={codigoPedido}
                onChange={(e) => setCodigoPedido(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label>Fecha</label>
              <input
                type="date"
                className="form-control"
                value={fechaPedido}
                readOnly
              />
            </div>
            <div className="col-md-4">
              <label>Hora</label>
              <input
                type="text"
                className="form-control"
                value={horaPedido}
                readOnly
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6">
              <label>Estado</label>
              <select
                className="form-select"
                value={estadoPedido}
                onChange={(e) => setEstadoPedido(e.target.value)}
              >
                <option>Pendiente</option>
                <option>Completado</option>
                <option>Cancelado</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Valor Pedido</label>
              <input
                type="number"
                className="form-control"
                value={valorPedido}
                readOnly
              />
            </div>
          </div>
        </div>
      )}

      {/* Detalles Pedido */}
      {cliente && (
        <div className="card p-3 mb-3">
          <h5>Agregar Productos</h5>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Código Producto"
                value={producto.codigoProducto}
                onChange={(e) =>
                  setProducto({ ...producto, codigoProducto: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-secondary w-100"
                type="button"
                onClick={handleBuscarProducto}
              >
                Buscar
              </button>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad"
                value={producto.cantidadProducto}
                onChange={(e) =>
                  setProducto({
                    ...producto,
                    cantidadProducto: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Producto"
                value={producto.nombreProducto}
                readOnly
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Valor Unitario"
                value={producto.precioProducto}
                readOnly
              />
            </div>
            <div className="col-md-12 mt-2">
              <button
                className="btn btn-success w-100"
                onClick={handleAgregarProducto}
              >
                Agregar
              </button>
            </div>
          </div>

          {/* Tabla de productos */}
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, index) => (
                <tr key={index}>
                  <td>{p.codigoProducto}</td>
                  <td>{p.nombreProducto}</td>
                  <td>{p.cantidadProducto}</td>
                  <td>{p.precioProducto}</td>
                  <td>{p.totalPagoProducto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botón Guardar */}
      {cliente && (
        <button className="btn btn-primary" onClick={handleGuardarPedido}>
          Guardar Pedido
        </button>
      )}
    </div>
  );
}

export default CrearPedido;
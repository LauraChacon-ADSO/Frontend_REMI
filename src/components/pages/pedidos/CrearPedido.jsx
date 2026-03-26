import React, { useState, useEffect } from "react";
import {
  buscarCliente,
  crearPedido,
  listarClientes,
  buscarProductoPorNombre,
} from "/src/services/apiPedido.js";
import "bootstrap/dist/css/bootstrap.min.css";

function CrearPedido() {
  const [documentoCliente, setDocumentoCliente] = useState("");
  const [cliente, setCliente] = useState(null);

  const [codigoPedido, setCodigoPedido] = useState("");
  const [fechaPedido, setFechaPedido] = useState("");
  const [horaPedido, setHoraPedido] = useState("");
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    codigoProducto: "",
    nombreProducto: "",
    cantidadProducto: 1,
    precioProducto: 0,
    totalPagoProducto: 0,
  });

  const [resultados, setResultados] = useState([]);

  const valorPedido = productos.reduce(
    (total, p) => total + p.totalPagoProducto,
    0
  );

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error cargando clientes", error);
      }
    };

    cargarClientes();
  }, []);

  useEffect(() => {
    if (busquedaNombre.trim() === "") {
      setClientesFiltrados([]);
      return;
    }

    const filtro = busquedaNombre.toLowerCase();

    const resultados = clientes.filter((c) =>
      c.nombreCliente.toLowerCase().includes(filtro)
    );

    setClientesFiltrados(resultados);
    setMostrarLista(true);
  }, [busquedaNombre, clientes]);

  const handleChangeNombre = async (text) => {
    setProducto({
      ...producto,
      nombreProducto: text,
    });

    if (text.length > 2) {
      const data = await buscarProductoPorNombre(text);
      setResultados(data);
    } else {
      setResultados([]);
    }
  };

  const handleAgregarProducto = () => {
    if (!producto.codigoProducto || producto.precioProducto <= 0) {
      alert("Debes seleccionar un producto válido");
      return;
    }

    const totalBase =
      (producto.precioProducto / 12) * producto.cantidadProducto;

    const redondearA50 = (valor) => Math.round(valor / 50) * 50;

    const nuevoProducto = {
      ...producto,
      totalPagoProducto: redondearA50(totalBase),
    };

    setProductos([...productos, nuevoProducto]);

    setProducto({
      codigoProducto: "",
      nombreProducto: "",
      cantidadProducto: 1,
      precioProducto: 0,
      totalPagoProducto: 0,
    });

    setResultados([]);
  };

  const handleGuardarPedido = async () => {
    if (!documentoCliente || productos.length === 0) {
      alert("Debe seleccionar un cliente y al menos un producto.");
      return;
    }

    const pedido = {
      codigoPedido,
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

      <div className="card p-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar cliente por nombre..."
          value={busquedaNombre}
          onChange={(e) => {
            setBusquedaNombre(e.target.value);
            setCliente(null);
          }}
        />

        {mostrarLista && clientesFiltrados.length > 0 && (
          <ul className="list-group position-absolute w-100">
            {clientesFiltrados.map((c) => (
              <button
                key={c.documentoCliente}
                className="list-group-item list-group-item-action"
                onClick={async () => {
                  setBusquedaNombre(
                    `${c.nombreCliente} ${c.apellidoCliente}`
                  );
                  setDocumentoCliente(c.documentoCliente);
                  setMostrarLista(false);

                  const data = await buscarCliente(c.documentoCliente);
                  setCliente(data);

                  const ahora = new Date();
                  setFechaPedido(ahora.toISOString().split("T")[0]);
                  setHoraPedido(ahora.toLocaleTimeString());
                }}
              >
                {c.nombreCliente} {c.apellidoCliente}
              </button>
            ))}
          </ul>
        )}

        {cliente && (
          <div className="card mt-3 p-3">
            <h5>Datos del Cliente</h5>
            <p><strong>Documento:</strong> {cliente.documentoCliente}</p>
            <p><strong>Nombre:</strong> {cliente.nombreCliente}</p>
            <p><strong>Email:</strong> {cliente.correoCliente}</p>
            <p><strong>Teléfono:</strong> {cliente.telefonoCliente}</p>
          </div>
        )}
      </div>

      {cliente && (
        <div className="card p-3 mb-3">
          <h5>Datos del Pedido</h5>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Código Pedido"
            value={codigoPedido}
            onChange={(e) => setCodigoPedido(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-2"
            value={fechaPedido}
            readOnly
          />

          <input
            type="text"
            className="form-control mb-2"
            value={horaPedido}
            readOnly
          />

          <select
            className="form-select mb-2"
            value={estadoPedido}
            onChange={(e) => setEstadoPedido(e.target.value)}
          >
            <option>Pendiente</option>
            <option>Completado</option>
          </select>

          <input
            type="number"
            className="form-control"
            value={valorPedido}
            readOnly
          />
        </div>
      )}

      <input
        type="text"
        className="form-control"
        placeholder="Buscar producto..."
        value={producto.nombreProducto}
        onChange={(e) => handleChangeNombre(e.target.value)}
      />

      {resultados.length > 0 && (
        <div className="list-group">
          {resultados.map((item) => (
            <button
              key={item.id ?? item.codigoProducto}
              className="list-group-item"
              onClick={() => {
                setProducto({
                  ...producto,
                  codigoProducto: item.id ?? item.codigoProducto,
                  nombreProducto: item.nombreProducto,
                  precioProducto: item.precioProducto ?? 0,
                });
                setResultados([]);
              }}
            >
              {item.nombreProducto}
            </button>
          ))}
        </div>
      )}

      <input
        type="number"
        className="form-control mt-2"
        placeholder="Cantidad"
        value={producto.cantidadProducto}
        onChange={(e) =>
          setProducto({
            ...producto,
            cantidadProducto: Number(e.target.value),
          })
        }
      />

      <button
        className="btn btn-success mt-2"
        onClick={handleAgregarProducto}
      >
        Agregar Producto
      </button>

      <table className="table mt-3">
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

      {cliente && (
        <button className="btn btn-primary" onClick={handleGuardarPedido}>
          Guardar Pedido
        </button>
      )}
    </div>
  );
}

export default CrearPedido;
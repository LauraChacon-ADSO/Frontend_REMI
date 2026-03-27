import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  listarClientes,
  buscarProductoPorNombre,
  editarPedido,
} from "/src/services/apiPedido";
import pedidoService from "/src/services/pedidoService";
import "bootstrap/dist/css/bootstrap.min.css";

function EditarPedido() {
  const { codigoPedido: id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);
  const [documentoCliente, setDocumentoCliente] = useState("");

  const [codigoPedido, setCodigoPedido] = useState("");
  const [fechaPedido, setFechaPedido] = useState("");
  const [horaPedido, setHoraPedido] = useState("");
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  const [clientes, setClientes] = useState([]);
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    codigoProducto: "",
    nombreProducto: "",
    cantidadProducto: 1,
    precioProducto: 0,
    precioUnitario: 0,
    totalPagoProducto: 0,
  });

  const [resultados, setResultados] = useState([]);

  const redondearA50 = (valor) => Math.round(valor / 50) * 50;

  const valorPedido = productos.reduce(
    (total, p) => total + p.totalPagoProducto,
    0
  );

  useEffect(() => {
    cargarPedido();
    cargarClientes();
  }, []);

  const cargarPedido = async () => {
    const data = await pedidoService.getPedidoPorId(id);

    setCodigoPedido(data.codigoPedido);
    setFechaPedido(data.fechaPedido?.split("T")[0]);
    setHoraPedido(data.horaPedido?.substring(0, 5));
    setEstadoPedido(data.estadoPedido);
    setDocumentoCliente(data.documentoCliente);

    setCliente(data);

    const productosMap = data.detallesP.map((p) => ({
      codigoProducto: p.codigoProducto,
      nombreProducto: p.nombreProducto,
      cantidadProducto: p.cantidadProducto,
      precioUnitario: p.valorProducto,
      totalPagoProducto: p.totalPagoProducto,
    }));

    setProductos(productosMap);
  };

  const cargarClientes = async () => {
    const data = await listarClientes();
    setClientes(data || []);
  };

  useEffect(() => {
    if (busquedaNombre.trim() === "") {
      setClientesFiltrados([]);
      setMostrarLista(false);
      return;
    }

    const filtro = busquedaNombre.toLowerCase();

    const resultados = clientes.filter((c) => {
      const nombreCompleto =
        `${c.nombreCliente} ${c.apellidoCliente}`.toLowerCase();

      return nombreCompleto.includes(filtro);
    });

    setClientesFiltrados(resultados);
    setMostrarLista(true);
  }, [busquedaNombre, clientes]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (producto.nombreProducto.length > 2) {
        const data = await buscarProductoPorNombre(
          producto.nombreProducto
        );
        setResultados(data?.data || data || []);
      } else {
        setResultados([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [producto.nombreProducto]);

  const handleAgregarProducto = () => {
    if (!producto.codigoProducto) return;

    const totalBase =
      producto.precioUnitario * producto.cantidadProducto;

    const nuevo = {
      ...producto,
      totalPagoProducto: redondearA50(totalBase),
    };

    setProductos([...productos, nuevo]);

    setProducto({
      codigoProducto: "",
      nombreProducto: "",
      cantidadProducto: 1,
      precioProducto: 0,
      precioUnitario: 0,
      totalPagoProducto: 0,
    });

    setResultados([]);
  };

  const handleEliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const handleEditarCantidad = (index, cantidad) => {
    const nuevos = [...productos];

    nuevos[index].cantidadProducto = cantidad;

    const totalBase =
      nuevos[index].precioUnitario * cantidad;

    nuevos[index].totalPagoProducto = redondearA50(totalBase);

    setProductos(nuevos);
  };

  const handleGuardar = async () => {
    const pedido = {
      fechaPedido,
      horaPedido,
      documentoCliente,
      estadoPedido,
      valorPedido,
      detallesP: productos,
    };

    await editarPedido(id, pedido);

    alert("✅ Pedido actualizado");
    navigate("/admin/listar-pedido");
  };

  return (
    <div className="container mt-4">
      <h2>Editar Pedido</h2>

      <div className="card p-3 mb-3 position-relative">
        <input
          className="form-control"
          placeholder="Buscar cliente..."
          value={busquedaNombre}
          onChange={(e) => setBusquedaNombre(e.target.value)}
        />

        {mostrarLista && clientesFiltrados.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
            {clientesFiltrados.map((c) => (
              <button
                key={c.documentoCliente}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setDocumentoCliente(c.documentoCliente);
                  setCliente(c);
                  setMostrarLista(false);
                }}
              >
                {c.nombreCliente} {c.apellidoCliente}
              </button>
            ))}
          </ul>
        )}

        {cliente && (
          <div className="card mt-3 p-3 shadow-sm border-0">
            <h5 className="mb-3">Datos del Cliente</h5>

            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Documento:</strong> {cliente.documentoCliente}
                </p>
                <p>
                  <strong>Nombre:</strong> {cliente.nombreCliente} {cliente.apellidoCliente}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {cliente && (
        <>
          <div className="card p-3 mb-3">
            <input className="form-control mb-2" value={codigoPedido} readOnly />
            <input className="form-control mb-2" value={fechaPedido} readOnly />

            <select
              className="form-select mb-2"
              value={estadoPedido}
              onChange={(e) => setEstadoPedido(e.target.value)}
            >
              <option>Pendiente</option>
              <option>Completado</option>
            </select>

            <input className="form-control mb-2" value={horaPedido} readOnly />
            <input className="form-control" value={valorPedido} readOnly />
          </div>

          <div className="position-relative">
            <input
              className="form-control"
              placeholder="Buscar producto..."
              value={producto.nombreProducto}
              onChange={(e) =>
                setProducto({ ...producto, nombreProducto: e.target.value })
              }
            />

            {resultados.length > 0 && (
              <div className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                {resultados.map((item) => {
                  const precioDocena = item.precioProducto ?? 0;
                  const precioUnitario = redondearA50(precioDocena / 12);

                  return (
                    <button
                      key={item.id ?? item.codigoProducto}
                      className="list-group-item"
                      onClick={() => {
                        setProducto({
                          ...producto,
                          codigoProducto: item.id ?? item.codigoProducto,
                          nombreProducto: item.nombreProducto,
                          precioProducto: precioDocena,
                          precioUnitario,
                        });
                        setResultados([]);
                      }}
                    >
                      {item.nombreProducto}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <input
            type="text"
            className="form-control mt-2"
            value={producto.cantidadProducto}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, "");
              setProducto({
                ...producto,
                cantidadProducto: valor === "" ? "" : Number(valor),
              });
            }}
          />

          <button className="btn btn-success mt-2" onClick={handleAgregarProducto}>
            Agregar Producto
          </button>

          <table className="table mt-3">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Unidad</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, index) => (
                <tr key={index}>
                  <td>{p.codigoProducto}</td>
                  <td>{p.nombreProducto}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={p.cantidadProducto}
                      onChange={(e) => {
                        const valor = e.target.value.replace(/\D/g, "");
                        handleEditarCantidad(index, valor === "" ? 0 : Number(valor));
                      }}
                    />
                  </td>
                  <td>{p.precioUnitario}</td>
                  <td>{p.totalPagoProducto}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminarProducto(index)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleGuardar}>
              Guardar Cambios
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/listar-pedido")}
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditarPedido;
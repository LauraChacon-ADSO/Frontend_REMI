import api from "./api";

export const buscarCliente = async (documentoCliente) => {
  try {
    const { data } = await api.get(`/Clientes/${documentoCliente}`);
    return data;
  } catch (error) {
    console.error("❌ Error al buscar cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const listarClientes = async () => {
  try {
    const { data } = await api.get("/Clientes");
    return data;
  } catch (error) {
    console.error("❌ Error al listar clientes:", error.response?.data || error.message);
    throw error;
  }
};

export const crearPedido = async (pedido) => {
  try {
    const { data } = await api.post("/PedidosInfo", pedido);
    return data;
  } catch (error) {
    console.error("❌ Error al crear pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const editarPedido = async (codigoPedido, pedido) => {
  try {
    const { data } = await api.put(`/PedidosInfo/${codigoPedido}`, pedido);
    return data;
  } catch (error) {
    console.error("❌ Error al editar pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const eliminarPedido = async (codigoPedido) => {
  try {
    const { data } = await api.delete(`/PedidosInfo/${codigoPedido}`);
    return data;
  } catch (error) {
    console.error("❌ Error al eliminar pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const buscarProducto = async (id) => {
  try {
    const { data } = await api.get(`/Productos/${id}`);
    return data;
  } catch (error) {
    console.error("❌ Error al buscar producto:", error.response?.data || error.message);
    throw error;
  }
};

export const buscarProductoPorNombre = async (nombre) => {
  try {
    const { data } = await api.get(`/Productos/buscar/${nombre}`);
    return data;
  } catch (error) {
    console.error("❌ Error al buscar producto:", error.response?.data || error.message);
    return [];
  }
};
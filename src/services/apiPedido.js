import axios from "axios";

const API_URL = "https://localhost:7052/api"; 

// 🔹 Buscar cliente por documento
export const buscarCliente = async (documentoCliente) => {
  try {
    const { data } = await axios.get(`${API_URL}/Clientes/${documentoCliente}`);
    return data; // retorna objeto cliente
  } catch (error) {
    console.error("❌ Error al buscar cliente:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Crear un pedido
export const crearPedido = async (pedido) => {
  try {
    const { data } = await axios.post(`${API_URL}/PedidosInfo`, pedido);
    return data; // retorna el pedido guardado
  } catch (error) {
    console.error("❌ Error al crear pedido:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Editar pedido
export const editarPedido = async (codigoPedido, pedido) => {
  try {
    const { data } = await axios.put(`${API_URL}/PedidosInfo/${codigoPedido}`, pedido);
    return data; // retorna el pedido actualizado
  } catch (error) {
    console.error("❌ Error al editar pedido:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Eliminar pedido
export const eliminarPedido = async (codigoPedido) => {
  try {
    const { data } = await axios.delete(`${API_URL}/PedidosInfo/${codigoPedido}`);
    return data; // podría retornar el pedido eliminado o confirmación
  } catch (error) {
    console.error("❌ Error al eliminar pedido:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Buscar producto por ID
export const buscarProducto = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/Productos/${id}`);
    return data; // retorna producto
  } catch (error) {
    console.error("❌ Error al buscar producto:", error.response?.data || error.message);
    throw error;
  }
};
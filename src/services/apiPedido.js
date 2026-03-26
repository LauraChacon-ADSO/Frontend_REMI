import axios from "axios";

const API_URL = "https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api"; 


export const buscarCliente = async (documentoCliente) => {
  try {
    const { data } = await axios.get(`${API_URL}/Clientes/${documentoCliente}`);
    return data; 
  } catch (error) {
    console.error("❌ Error al buscar cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const listarClientes = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/Clientes`);
    return data;
  } catch (error) {
    console.error("❌ Error al listar clientes:", error.response?.data || error.message);
    throw error;
  }
};

export const crearPedido = async (pedido) => {
  try {
    const { data } = await axios.post(`${API_URL}/PedidosInfo`, pedido);
    return data; 
  } catch (error) {
    console.error("❌ Error al crear pedido:", error.response?.data || error.message);
    throw error;
  }
};


export const editarPedido = async (codigoPedido, pedido) => {
  try {
    const { data } = await axios.put(`${API_URL}/PedidosInfo/${codigoPedido}`, pedido);
    return data;
  } catch (error) {
    console.error("❌ Error al editar pedido:", error.response?.data || error.message);
    throw error;
  }
};


export const eliminarPedido = async (codigoPedido) => {
  try {
    const { data } = await axios.delete(`${API_URL}/PedidosInfo/${codigoPedido}`);
    return data; 
  } catch (error) {
    console.error("❌ Error al eliminar pedido:", error.response?.data || error.message);
    throw error;
  }
};


export const buscarProducto = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/Productos/${id}`);
    return data; 
  } catch (error) {
    console.error("❌ Error al buscar producto:", error.response?.data || error.message);
    throw error;
  }
};

export const buscarProductoPorNombre = async (nombre) => {
  try {
    const { data } = await axios.get(`${API_URL}/Productos/buscar/${nombre}`);
    return data;
  } catch (error) {
    console.error("❌ Error al buscar producto:", error.response?.data || error.message);
    return [];
  }
};
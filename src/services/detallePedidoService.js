import axios from "axios";

const API_URL = "https://localhost:7052/api/pedidosInfo"; // cambia al endpoint real

export const obtenerPedidos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // lista de PedidoDto
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
};
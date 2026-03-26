import axios from "axios";

const API_URL = "https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/pedidosInfo";

export const obtenerPedidos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
};
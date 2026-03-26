import axios from "axios";

const API_BASE_URL = "https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/formaPagos";

const metodoService = {
  getMetodos: async () => {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error("Error al obtener métodos de pago");
    return await res.json();
  },

  getMetodoPorId: async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener método por ID");
    return await res.json();
  },

  crearMetodo: async (metodo) => {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metodo),
    });
    if (!res.ok) throw new Error("Error al crear método");
    return await res.json();
  },
};

export default metodoService;
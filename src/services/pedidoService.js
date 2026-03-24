const API_PEDIDOS_URL = "https://localhost:7052/api/PedidosInfo";

const pedidoService = {
    // 🔹 Obtener todos los pedidos
    getPedidos: async () => {
        const response = await fetch(API_PEDIDOS_URL);
        if (!response.ok) {
            throw new Error("Error al obtener pedidos");
        }
        return await response.json();
    },

    // 🔹 Buscar pedido por filtro (ej: código o cliente)
    buscarPedido: async (filtro) => {
        const response = await fetch(`${API_PEDIDOS_URL}?search=${filtro}`);
        if (!response.ok) {
            throw new Error("Error al buscar pedido");
        }
        return await response.json();
    },

    // 🔹 Obtener pedido por ID
    getPedidoPorId: async (id) => {
        const response = await fetch(`${API_PEDIDOS_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener pedido por ID");
        }
        return await response.json();
    },

    // 🔹 Actualizar pedido
    actualizarPedido: async (id, pedido) => {
        const response = await fetch(`${API_PEDIDOS_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar pedido");
        }
    },

    // 🔹 Eliminar pedido
    eliminarPedido: async (id) => {
        const response = await fetch(`${API_PEDIDOS_URL}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Error al eliminar pedido");
        }
    },
    // 🔹 Completar pedido con método de pago
    completarPedido: async (id, metodoPago) => {
        const response = await fetch(`${API_PEDIDOS_URL}/${id}/completar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ metodoPago })
        });

        if (!response.ok) {
            throw new Error("Error al completar pedido");
        }

        return await response.json();
    },
    actualizarEstado: async (id, nuevoEstado) => {
    const response = await fetch(`${API_PEDIDOS_URL}/${id}/estado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estadoPedido: nuevoEstado })
    });

    if (!response.ok) {
      throw new Error("Error al actualizar estado del pedido");
    }

    return await response.json();
  },
    
};

export default pedidoService;

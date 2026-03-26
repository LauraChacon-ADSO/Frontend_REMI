import api from "./api";

const pedidoService = {
    getPedidos: async () => {
        const response = await api.get("/PedidosInfo");
        return response.data;
    },

    buscarPedido: async (filtro) => {
        const response = await api.get(`/PedidosInfo?search=${filtro}`);
        return response.data;
    },

    getPedidoPorId: async (id) => {
        const response = await api.get(`/PedidosInfo/${id}`);
        return response.data;
    },

    actualizarPedido: async (id, pedido) => {
        await api.put(`/PedidosInfo/${id}`, pedido);
    },

    eliminarPedido: async (id) => {
        await api.delete(`/PedidosInfo/${id}`);
    },

    completarPedido: async (id, metodoPago) => {
        const response = await api.put(`/PedidosInfo/${id}/completar`, {
            metodoPago
        });
        return response.data;
    },

    actualizarEstado: async (id, nuevoEstado) => {
        const response = await api.put(`/PedidosInfo/${id}/estado`, {
            estadoPedido: nuevoEstado
        });
        return response.data;
    },
};

export default pedidoService;

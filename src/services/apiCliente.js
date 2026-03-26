import api from "./api"; 

const clienteService = {

    getClientes: async () => {
        const response = await api.get("/clientes");
        return response.data;
    },

    buscarCliente: async (filtro) => {
        try {
            const response = await api.get(`/clientes?search=${filtro}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return [];
            }
            throw error;
        }
    },

    actualizarCliente: async (id, cliente) => {
        await api.put(`/clientes/${id}`, cliente);
    },

    crearCliente: async (cliente) => {
        console.log("➡️ Enviando al backend:", cliente);

        try {
            const response = await api.post("/clientes", cliente);
            return response.data;
        } catch (error) {
            console.error("❌ Error backend:", error.response?.data);
            throw error;
        }
    },

    eliminarCliente: async (id) => {
        try {
            await api.delete(`/clientes/${id}`);
            return true;
        } catch (error) {
            throw new Error("Error al eliminar cliente");
        }
    },

    getClientePorId: async (id) => {
        try {
            const response = await api.get(`/clientes/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }
};

export default clienteService;
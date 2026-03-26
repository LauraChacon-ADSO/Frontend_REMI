import api from "./api";

export const getCategorias = async () => {
  const response = await api.get("/categorias");
  return response.data;
};

export const crearCategoria = async (categoria) => {
  const dto = {
    nombreCategorias: categoria.nombreCategorias,
  };

  const response = await api.post("/categorias", dto);
  return response.data;
};

export const updateCategoria = async (id, categoria) => {
  const dto = {
    nombreCategorias: categoria.nombreCategorias,
  };

  const response = await api.put(`/categorias/${id}`, dto);
  return response.data;
};

export const deleteCategoria = async (id) => {
  const response = await api.delete(`/categorias/${id}`);
  return response.data;
};
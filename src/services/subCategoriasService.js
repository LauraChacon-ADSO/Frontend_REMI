import api from "./api";

export const getSubCategorias = async () => {
  const res = await api.get("/subCategorias");
  return res.data;
};

export const getSubCategoriasByCategoria = async (categoriaId) => {
  const res = await api.get(`/subCategorias/categoria/${categoriaId}`);
  return res.data;
};

export const crearSubCategoria = async (subCategoria) => {
  const dto = {
    nombreSubCategorias: subCategoria.nombreSubCategorias,
    codigoCategorias: subCategoria.codigoCategorias,
  };

  const res = await api.post("/subCategorias", dto);
  return res.data;
};

export const updateSubCategoria = async (id, subCategoria) => {
  const dto = {
    nombreSubCategorias: subCategoria.nombreSubCategorias,
    codigoCategorias: subCategoria.codigoCategorias,
  };

  const res = await api.put(`/subCategorias/${id}`, dto);
  return res.data;
};

export const deleteSubCategoria = async (id) => {
  const res = await api.delete(`/subCategorias/${id}`);
  return res.data;
};
import axios from "axios";

const API_URL = "https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/subCategorias";

export const getSubCategorias = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getSubCategoriasByCategoria = async (categoriaId) => {
  const res = await axios.get(`${API_URL}/categoria/${categoriaId}`);
  return res.data;
};

export const crearSubCategoria = async (subCategoria) => {
  const dto = {
    nombreSubCategorias: subCategoria.nombreSubCategorias,
    codigoCategorias: subCategoria.codigoCategorias,
  };

  const res = await axios.post(API_URL, dto);
  return res.data;
};

export const updateSubCategoria = async (id, subCategoria) => {
  const dto = {
    nombreSubCategorias: subCategoria.nombreSubCategorias,
    codigoCategorias: subCategoria.codigoCategorias,
  };

  const res = await axios.put(`${API_URL}/${id}`, dto);
  return res.data;
};

export const deleteSubCategoria = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

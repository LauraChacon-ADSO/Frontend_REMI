import axios from "axios";

const API_URL = "https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/categorias"; 


export const getCategorias = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const crearCategoria = async (categoria) => {
  const dto = {
    nombreCategorias: categoria.nombreCategorias
  };

  const response = await axios.post(API_URL, dto);
  return response.data;
};


export const updateCategoria = async (id, categoria) => {
  const dto = {
    nombreCategorias: categoria.nombreCategorias
  };

  const response = await axios.put(`${API_URL}/${id}`, dto);
  return response.data;
};


export const deleteCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


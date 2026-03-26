import api from "./api";

export const getUsuarios = async () => {
  const response = await api.get("/Auth/usuarios");
  return response.data;
};

export const getUsuarioPorId = async (documento) => {
  const response = await api.get(`/Auth/usuarios/${documento}`);
  return response.data;
};

export const actualizarUsuario = async (documento, usuario) => {
  const response = await api.put(`/Auth/usuarios/${documento}`, usuario);
  return response.data;
};

export const crearUsuario = async (usuario) => {
  const response = await api.post("/Auth/register", usuario);
  return response.data;
};

export const eliminarUsuario = async (documento) => {
  const response = await api.delete(`/Auth/usuarios/${documento}`);
  return response.data;
};
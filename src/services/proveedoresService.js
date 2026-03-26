import axios from "axios";

const API_URL = "https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/proveedores";


export const getProveedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearProveedor = async (proveedor) => {
  const dto = {
    documentoProveedor: proveedor.documentoProveedor,
    tipoDocumentoProveedor: proveedor.tipoDocumentoProveedor,
    nombreProveedor: proveedor.nombreProveedor,
    correoProveedor: proveedor.correoProveedor,
    telefonoProveedor: proveedor.telefonoProveedor,
  };

  const response = await axios.post(API_URL, dto);
  return response.data;
};


export const updateProveedor = async (id, proveedor) => {
  const dto = {
    documentoProveedor: proveedor.documentoProveedor,
    tipoDocumentoProveedor: proveedor.tipoDocumentoProveedor,
    nombreProveedor: proveedor.nombreProveedor,
    correoProveedor: proveedor.correoProveedor,
    telefonoProveedor: proveedor.telefonoProveedor,
  };

  const response = await axios.put(`${API_URL}/${id}`, dto);
  return response.data;
};


export const deleteProveedor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
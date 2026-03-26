import api from "./api";

export const getProveedores = async () => {
  const response = await api.get("/proveedores");
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

  const response = await api.post("/proveedores", dto);
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

  const response = await api.put(`/proveedores/${id}`, dto);
  return response.data;
};

export const deleteProveedor = async (id) => {
  const response = await api.delete(`/proveedores/${id}`);
  return response.data;
};
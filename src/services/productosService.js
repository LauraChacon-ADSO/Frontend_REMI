import api from "./api";

export const getProductos = async () => {
  const response = await api.get("/productos");
  return response.data;
};

export const getProductosBySubCategoria = async (subCategoriaId) => {
  const response = await api.get(`/productos/subcategoria/${subCategoriaId}`);
  return response.data;
};

export const crearProducto = async (producto) => {
  const dto = {
    nombreProducto: producto.nombreProducto,
    marcaProducto: producto.marcaProducto,
    precioProducto: producto.precioProducto,
    CodigoSubCategoria: producto.codigoSubCategorias,
    documentoProveedor: producto.documentoProveedor,
  };

  const response = await api.post("/productos", dto);
  return response.data;
};

export const updateProducto = async (id, producto) => {
  const dto = {
    nombreProducto: producto.nombreProducto,
    marcaProducto: producto.marcaProducto,
    precioProducto: producto.precioProducto,
    CodigoSubCategoria: producto.codigoSubCategorias,
    documentoProveedor: producto.documentoProveedor,
  };

  const response = await api.put(`/productos/${id}`, dto);
  return response.data;
};

export const deleteProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`);
  return response.data;
};
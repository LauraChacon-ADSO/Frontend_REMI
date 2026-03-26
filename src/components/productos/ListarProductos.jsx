import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager,
  SearchPanel,
} from "devextreme-react/data-grid";

import {
  getProductos,
  getProductosBySubCategoria,
  crearProducto,
  updateProducto,
  deleteProducto,
} from "../../services/productosService";

import "../../assets/estilos/ListarProductos.css"; 

const ListarProductos = () => {
  const { subCategoriaId } = useParams();
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const data = subCategoriaId
      ? await getProductosBySubCategoria(subCategoriaId)
      : await getProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, [subCategoriaId]);



  const onRowInserted = async (e) => {
    try {
      if (subCategoriaId) {
        e.data.codigoSubCategorias = Number(subCategoriaId);
      }
      await crearProducto(e.data);
      cargarProductos();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  const onRowUpdated = async (e) => {
    try {
      if (subCategoriaId) {
        e.data.codigoSubCategorias = Number(subCategoriaId);
      }
      await updateProducto(e.data.codigoProducto, e.data);
      cargarProductos();
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  const onRowRemoved = async (e) => {
    try {
      await deleteProducto(e.data.codigoProducto);
      cargarProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="contenedor-tabla">
      <h2 className="titulo-tabla">🛒 Productos</h2>
      <p className="subtitulo-tabla">
        Listado de productos registrados en el inventario
      </p>

      <DataGrid
        dataSource={productos}
        keyExpr="codigoProducto"
        showBorders={true}
        onRowInserted={onRowInserted}
        onRowUpdated={onRowUpdated}
        onRowRemoved={onRowRemoved}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        allowColumnResizing={true}
        columnResizingMode="widget"
        columnHidingEnabled={true}
      >
        {/* BUSCADOR */}
        <SearchPanel visible={true} highlightCaseSensitive={true} />

        {/* EDICIÓN */}
        <Editing
          mode="row"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={false}
        />

        {/* COLUMNAS */}
        <Column
          dataField="codigoProducto"
          caption="ID"
          width={80}
          allowEditing={false}
        />

        <Column
          dataField="nombreProducto"
          caption="Nombre Producto"
          width={220}
        />

        <Column
          dataField="entradaProducto"
          caption="Entrada Producto"
          width={140}
        />

        <Column
          dataField="marcaProducto"
          caption="Marca"
          width={160}
        />

        <Column
          dataField="precioProducto"
          caption="Precio"
          width={120}
          dataType="number"
        />

        <Column
          dataField="codigoSubCategorias"
          caption="Subcategoría"
          width={160}
        />

        <Column
          dataField="documentoProveedor"
          caption="Proveedor"
          width={180}
        />

        {/* PAGINACIÓN */}
        <Paging defaultPageSize={5} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
        />
      </DataGrid>
    </div>
  );
};

export default ListarProductos;
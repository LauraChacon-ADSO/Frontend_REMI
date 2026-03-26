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
  getSubCategoriasByCategoria,
  crearSubCategoria,
  updateSubCategoria,
  deleteSubCategoria,
} from "../../services/subCategoriasService";

import "../../assets/estilos/ListarCategorias.css";

const ListarSubCategorias = () => {
  const { categoriaId } = useParams();

  const [subCategorias, setSubCategorias] = useState([]);

  const cargarSubCategorias = async () => {
    if (!categoriaId) return;
    const data = await getSubCategoriasByCategoria(categoriaId);
    setSubCategorias(data);
  };

  useEffect(() => {
    cargarSubCategorias();
  }, [categoriaId]);

  const onRowInserted = async (e) => {
    e.data.codigoCategorias = Number(categoriaId);
    await crearSubCategoria(e.data);
    cargarSubCategorias();
  };

  const onRowUpdated = async (e) => {
    await updateSubCategoria(e.data.codigoSubCategorias, e.data);
    cargarSubCategorias();
  };

  const onRowRemoved = async (e) => {
    await deleteSubCategoria(e.data.codigoSubCategorias);
    cargarSubCategorias();
  };

  return (
    <div className="contenedor-tabla">
      <h2 className="titulo-tabla">📂 Subcategorías</h2>
      <p className="subtitulo-tabla">
        Listado de subcategorías registradas
      </p>

      <DataGrid
        dataSource={subCategorias}
        keyExpr="codigoSubCategorias"
        showBorders={true}
        onRowInserted={onRowInserted}
        onRowUpdated={onRowUpdated}
        onRowRemoved={onRowRemoved}
      >
        <SearchPanel visible={true} />

        <Editing
          mode="row"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={false}
        />

        <Column
          dataField="codigoSubCategorias"
          caption="ID"
          width={80}
          allowEditing={false}
        />

        <Column
          dataField="nombreSubCategorias"
          caption="Nombre Subcategoría"
        />

        <Paging defaultPageSize={5} />
        <Pager showPageSizeSelector allowedPageSizes={[5, 10, 20]} />
      </DataGrid>
    </div>
  );
};

export default ListarSubCategorias;

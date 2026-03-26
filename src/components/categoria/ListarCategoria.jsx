import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager,
  SearchPanel,
} from "devextreme-react/data-grid";
import {
  getCategorias,
  crearCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../services/categoriasService";
import "../../assets/estilos/ListarCategorias.css";

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const cargarCategorias = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const onRowInserted = async (e) => {
    await crearCategoria(e.data);
    cargarCategorias();
  };

  const onRowUpdated = async (e) => {
    await updateCategoria(e.data.codigoCategorias, e.data);
    cargarCategorias();
  };

  const onRowRemoved = async (e) => {
    await deleteCategoria(e.data.codigoCategorias);
    cargarCategorias();
  };

  return (
    <div className="contenedor-tabla">
      <h2 className="titulo-tabla">📁 Categorías</h2>
      <p className="subtitulo-tabla">
        Listado de categorías registradas
      </p>

      <DataGrid
        dataSource={categorias}
        keyExpr="codigoCategorias"
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
          dataField="codigoCategorias"
          caption="ID"
          width={80}
          allowEditing={false}
        />

        <Column
          dataField="nombreCategorias"
          caption="Nombre Categoría"
        />

        
        <Column
          caption="Subcategorías"
          alignment="center"
          cellRender={({ data }) => (
            <button
              className="btn btn-success btn-sm"
              onClick={() =>
                navigate(`/admin/subcategorias/${data.codigoCategorias}`)
              }
            >
              Ver Subcategorías
            </button>
          )}
        />

        <Paging defaultPageSize={5} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
        />
      </DataGrid>
    </div>
  );
};

export default ListarCategorias;


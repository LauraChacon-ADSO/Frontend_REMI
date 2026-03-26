import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager,
  SearchPanel,
} from "devextreme-react/data-grid";

import {
  getProveedores,
  crearProveedor,
  updateProveedor,
  deleteProveedor,
} from "../../services/proveedoresService";

import "../../assets/estilos/ListarProveedores.css"; 


const ListarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);

  const cargarProveedores = async () => {
    try {
      const data = await getProveedores();
      setProveedores(data);
    } catch (error) {
      console.error("Error cargando proveedores:", error);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const onRowInserted = async (e) => {
    try {
      await crearProveedor(e.data);
      cargarProveedores();
      alert("Proveedor agregado con éxito");
    } catch (error) {
      console.error("Error creando proveedor:", error);
      alert("Error al agregar proveedor");
    }
  };

  const onRowUpdated = async (e) => {
    try {
      await updateProveedor(e.data.documentoProveedor, e.data);
      cargarProveedores();
      alert("Proveedor editado con éxito");
    } catch (error) {
      console.error("Error editando proveedor:", error);
      alert("Error al editar proveedor");
    }
  };

  const onRowRemoved = async (e) => {
  try {
    await deleteProveedor(e.data.documentoProveedor);

    await cargarProveedores();

    alert("Proveedor desactivado con éxito");
  } catch (error) {
    console.error("Error desactivando proveedor:", error);
    alert("Error al desactivar proveedor");
  }
};

  return (
    <div className="contenedor-tabla">
      <h2 className="titulo-tabla">🚚 Proveedores</h2>
      <p className="subtitulo-tabla">
        Listado de proveedores registrados
      </p>

      <DataGrid
        dataSource={proveedores}
        keyExpr="documentoProveedor"
        showBorders={true}
        onRowInserted={onRowInserted}
        onRowUpdated={onRowUpdated}
        onRowRemoved={onRowRemoved}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />

        <Editing
          mode="row"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={false}
        />

        <Column
          dataField="documentoProveedor"
          caption="Documento"
          width={150}
          allowEditing={false}
        />
        <Column
          dataField="tipoDocumentoProveedor"
          caption="Tipo Documento"
          width={160}
        />
        <Column
          dataField="nombreProveedor"
          caption="Nombre Proveedor"
        />
        <Column
          dataField="correoProveedor"
          caption="Correo"
          width={220}
        />
        <Column
          dataField="telefonoProveedor"
          caption="Teléfono"
          width={160}
        />

        <Column
          type="buttons"
          width={160}
          alignment="center"
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

export default ListarProveedores;

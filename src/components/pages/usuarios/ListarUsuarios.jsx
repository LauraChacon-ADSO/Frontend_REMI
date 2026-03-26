import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/Auth/usuarios", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        console.log("📦 Usuarios recibidos:", data);
        setUsuarios(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("❌ Error cargando usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (documento) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://proyecto-remi-webapi2026-c3d2d9h2gecwfbf3.canadacentral-01.azurewebsites.net/api/Auth/usuarios/${documento}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar usuario");

      alert("✅ Usuario eliminado correctamente");
      setUsuarios((prev) =>
        prev.filter((u) => u.documentoUsuario !== documento)
      );
    } catch (error) {
      console.error("❌ Error eliminando usuario:", error);
      alert("❌ Error al eliminar usuario");
    }
  };

  
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombreUsuario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h3 className="text-primary fw-bold mb-3">👥 Lista de Usuarios</h3>

      
      <Form.Control
        type="text"
        placeholder="Buscar por nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="mb-3"
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => (
              <tr key={usuario.documentoUsuario}>
                <td>{usuario.documentoUsuario}</td>
                <td>{usuario.tipoDocumentoUsuario}</td>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.apellidoUsuario}</td>
                <td>{usuario.correoUsuario}</td>
                <td>{usuario.codigoNivel === 1 ? "Admin" : "Vendedor"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      navigate(`/admin/usuarios-editar/${usuario.documentoUsuario}`)
                    }
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(usuario.documentoUsuario)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ListarUsuarios;

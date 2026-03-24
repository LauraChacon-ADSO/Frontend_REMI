const API_BASE_URL = 'https://localhost:7052/api/Auth/usuarios';

const usuarioService = {
  // Listar todos
  getUsuarios: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
  },

  
  getUsuarioPorId: async (documento) => {
    const response = await fetch(`${API_BASE_URL}/${documento}`);
    if (!response.ok) throw new Error('Error al obtener usuario por documento');
    return await response.json();
  },

  
  actualizarUsuario: async (documento, usuario) => {
    const response = await fetch(`${API_BASE_URL}/${documento}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return await response.json();
  },

  
  crearUsuario: async (usuario) => {
    const response = await fetch('https://localhost:7052/api/Auth/register', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Error al crear usuario');
    return await response.json();
  },

  
  eliminarUsuario: async (documento) => {
    const response = await fetch(`${API_BASE_URL}/${documento}`, { method: "DELETE" });
    if (!response.ok) throw new Error('Error al eliminar usuario');
    return await response.json();
  },
};

export default usuarioService;

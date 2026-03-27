import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "/src/components/layouts/AdminLayout";
import VendedorLayout from "/src/components/layouts/VendedorLayout";
import Dashboard from "/src/components/pages/Dashboard.jsx";
import DashboardV from "/src/components/pages/DashboardV.jsx";
import CrearPedido from "/src/components/pages/pedidos/CrearPedido.jsx";
import ListarPedido from "/src/components/pages/pedidos/listarPedido.jsx";
import ListaDetallePedido from './components/pages/pedidos/listaDetallePedido';
import ListarCliente from './components/pages/clientes/listarCliente';  
import EditarCliente from './components/pages/clientes/EditarCliente';
import AgregarCliente from './components/pages/clientes/AgregarCliente';
import ListarMetodosPago from './components/pages/metodosPago/ListarPago';
import AgregarMetodoPago from './components/pages/metodosPago/AgregarMetodo';
import ListarUsuarios from './components/pages/usuarios/ListarUsuarios.jsx';  
import EditarUsuario from './components/pages/usuarios/EditarUsuario.jsx';    
import AgregarUsuario from './components/pages/usuarios/AgregarUsuario.jsx';  
import Login from "./components/pages/Login.jsx";
import Perfil from "./components/pages/Perfil.jsx";
import ReportesProductos from './components/pages/reportes/ReportesProductos.jsx';
import ReportesVentas from './components/pages/reportes/ReportesVentas.jsx';
import ListarProductos from "./components/productos/ListarProductos.jsx";
import ListarCategorias from "./components/categoria/ListarCategoria.jsx";
import ListarSubCategorias from "./components/subcategoria/ListarSubCategorias.jsx";
import ListarProveedores from "./components/proveedores/Listarproveedores.jsx";
import EditarPedido from './components/pages/pedidos/EditarPedido.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from "./routes";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("rol");

  if (!token) return <Navigate to="/login" replace />;
  if (
    roles &&
    !roles.map(r => r.toLowerCase()).includes(userRole?.trim().toLowerCase())
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/login" element={<Login />} />

        
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="crear-pedido" element={<CrearPedido />} />
          <Route path="listar-pedido" element={<ListarPedido />} />
          <Route path="detalle-pedido/:codigoPedido" element={<ListaDetallePedido />} />
          <Route path="editar-pedido/:codigoPedido" element={<EditarPedido />} />

          <Route path="clientes-lista" element={<ListarCliente />} />
          <Route path="clientes-editar/:documentoCliente" element={<EditarCliente />} />
          <Route path="clientes-agregar" element={<AgregarCliente />} />

          <Route path="metodos-lista" element={<ListarMetodosPago />} />
          <Route path="metodos-agregar" element={<AgregarMetodoPago />} />

          <Route path="productos" element={<ListarProductos />} />

       
          <Route path="categorias" element={<ListarCategorias />} />
          <Route
            path="subcategorias/:categoriaId"
            element={<ListarSubCategorias />}
          />

        
          <Route path="proveedores" element={<ListarProveedores />} />

          <Route path="usuarios-lista" element={<ListarUsuarios />} />
          <Route path="usuarios-editar/:documento" element={<EditarUsuario />} />
          <Route path="usuarios-agregar" element={<AgregarUsuario />} />

          <Route path="reportes-productos" element={<ReportesProductos />} />
          <Route path="reportes-ventas" element={<ReportesVentas />} />
          

          
          <Route path="perfil" element={<Perfil />} />
        </Route>

        
        <Route
          path="/vendedor"
          element={
            <ProtectedRoute role="Vendedor">
              <VendedorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardV />} />
          <Route path="dashboard" element={<DashboardV />} /> 

          <Route path="listar-pedido" element={<ListarPedido />} />
          <Route path="detalle-pedido/:codigoPedido" element={<ListaDetallePedido />} />

          <Route path="clientes-lista" element={<ListarCliente />} />
          <Route path="clientes-agregar" element={<AgregarCliente />} />

          
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<Navigate to="/admin/productos" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

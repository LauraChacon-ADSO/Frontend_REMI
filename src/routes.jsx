import Dashboard from "./components/pages/Dashboard.jsx";
import CrearPedido from "./components/pages/pedidos/CrearPedido.jsx";
import ListarPedido from "./components/pages/pedidos/listarPedido.jsx";

const routes = [
  {
    path: "dashboard", 
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "crear-pedido",
    name: "Crear Pedido",
    component: CrearPedido,
    layout: "/admin",
  },
  {
    path: "listar-pedido",
    name: "Listar Pedido",
    component: ListarPedido,
    layout: "/admin",
  },
];

export default routes
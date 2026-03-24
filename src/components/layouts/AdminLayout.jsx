// src/layouts/AdminLayout.jsx
import React from "react";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import TopNavbar from "/src/components/menu/BarraNavegacion.jsx";

function AdminLayout() {
  return (
    <div>
      {/* Navbar fijo arriba */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "60px", // altura navbar
        }}
      >
        <TopNavbar />
      </div>

      {/* Sidebar fijo debajo del navbar */}
      <div
        style={{
          position: "fixed",
          top: "60px",
          left: 0,
          bottom: 0,
          width: "260px",
          zIndex: 900,
        }}
      >
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <main className="main-content">
        <Outlet /> {/* Aquí se carga cada página */}
      </main>
    </div>
  );
}
export default AdminLayout;

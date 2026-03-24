import React from "react";
import SidebarVendedor from "/src/components/Sidebar/SidebarV"; 
import { Outlet } from "react-router-dom";
import TopNavbar from "/src/components/menu/BarraNavegacion.jsx";

function VendedorLayout() {
  return (
    <div>
      
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "60px",
        }}
      >
        <TopNavbar />
      </div>

      
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
        <SidebarVendedor />
      </div>

      
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default VendedorLayout;

import './Sidebar.css';
import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaReceipt,
  FaUsers,
  FaChevronDown,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SidebarVendedor() {
  const [open, setOpen] = useState("");

  const toggleMenu = (menu) => {
    setOpen(open === menu ? "" : menu);
  };

  return (
    <div
      className="d-flex flex-column p-3 text-white"
      style={{
        width: "260px",
        height: "100vh",
        background: "#1fb601",
      }}
    >
      
      <div className="mb-4 text-center">
        <a
          href="/vendedor/dashboard"
          className="d-flex flex-column align-items-center text-white text-decoration-none"
        >
          <span className="fs-3 fw-bold" style={{ letterSpacing: "1px" }}>
            REMI
          </span>
          <small style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
            Recibos y Manejo de Inventario
          </small>
        </a>
      </div>

      <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <ul className="nav nav-pills flex-column mb-auto">
        
        <li className="nav-item">
          <a href="/vendedor/dashboard" className="nav-link text-white">
            <FaHome className="me-2" /> Inicio
          </a>
        </li>

        
        <li className="nav-item">
          <div
            className="nav-link text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("pedidos")}
          >
            <span>
              <FaClipboardList className="me-2" /> Pedidos
            </span>
            <FaChevronDown
              style={{
                transform: open === "pedidos" ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </div>
          {open === "pedidos" && (
            <ul className="nav flex-column ms-4 mt-2">
              <li>
                <a href="/vendedor/listar-pedido" className="nav-link text-white">
                  Ver Pedidos
                </a>
              </li>
              <li>
                <a href="/vendedor/crear-pedido" className="nav-link text-white">
                  Crear Pedido
                </a>
              </li>
            </ul>
          )}
        </li>

        
        <li className="nav-item">
          <div
            className="nav-link text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("clientes")}
          >
            <span>
              <FaUsers className="me-2" /> Clientes
            </span>
            <FaChevronDown
              style={{
                transform: open === "clientes" ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </div>
          {open === "clientes" && (
            <ul className="nav flex-column ms-4 mt-2">
              <li>
                <a href="/vendedor/clientes-agregar" className="nav-link text-white">
                  Agregar Cliente
                </a>
              </li>
              <li>
                <a href="/vendedor/clientes-lista" className="nav-link text-white">
                  Ver Clientes
                </a>
              </li>
            </ul>
          )}
        </li>

        
        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <FaBox className="me-2" /> Productos
          </a>
        </li>

        
        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <FaReceipt className="me-2" /> Recibo
          </a>
        </li>
      </ul>
    </div>
  );
}

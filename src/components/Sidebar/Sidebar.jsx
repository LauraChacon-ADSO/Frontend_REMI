import './Sidebar.css'; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBox,
  FaClipboardList,
  FaReceipt,
  FaUsers,
  FaTruck,
  FaCreditCard,
  FaChevronDown,
  FaFolderOpen,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
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
      {/* Logo */}
      <div className="mb-4 text-center">
        <a
          href="/admin/dashboard"
          className="d-flex flex-column align-items-center text-white text-decoration-none"
        >
          <span
            className="fs-3 fw-bold"
            style={{ letterSpacing: "1px", color: "#ffffff" }}
          >
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
          <a href="/admin/dashboard" className="nav-link text-white">
            <FaHome className="me-2" /> Inicio
          </a>
        </li>

        {/* Usuarios */}
        <li className="nav-item">
          <div
            className="nav-link text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("usuarios")}
          >
            <span>
              <FaUser className="me-2" /> Usuarios
            </span>
            <FaChevronDown
              style={{
                transform: open === "usuarios" ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </div>
          {open === "usuarios" && (
            <ul className="nav flex-column ms-4 mt-2">
              <li>
                <a href="/admin/usuarios-agregar" className="nav-link text-white">
                  Registrar Usuario
                </a>
              </li>
              <li>
                <a href="/admin/usuarios-lista" className="nav-link text-white">
                  Usuarios
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* PRODUCTOS */}
        <li className="nav-item">
          <div
            className="nav-link text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("productos")}
          >
            <span>
              <FaBox className="me-2" /> Productos
            </span>
            <FaChevronDown
              style={{
                transform:
                  open === "productos" ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </div>

          {open === "productos" && (
            <ul className="nav flex-column ms-4 mt-2">
              <li>
                <Link to="/admin/productos" className="nav-link text-white">
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/productos/agregar"
                  className="nav-link text-white"
                >
                  Agregar Producto
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Pedidos */}
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
                <a href="/admin/listar-pedido" className="nav-link text-white">
                  Pedidos
                </a>
              </li>
              <li>
                <a href="/admin/crear-pedido" className="nav-link text-white">
                  Agregar Pedido
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
                <a href="/admin/clientes-agregar" className="nav-link text-white">
                  Agregar Cliente
                </a>
              </li>
              <li>
                <a href="/admin/clientes-lista" className="nav-link text-white">
                  Clientes
                </a>
              </li>
            </ul>
          )}
        </li>

        
        {/* PROVEEDORES */}
        <li className="nav-item">
          <div
            className="nav-link text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("proveedores")}
          >
            <span>
              <FaTruck className="me-2" /> Proveedores
            </span>
            <FaChevronDown
              style={{
                transform:
                  open === "proveedores" ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </div>

          {open === "proveedores" && (
            <ul className="nav flex-column ms-4 mt-2">
             
              <li>
                 <Link to="/admin/proveedores" className="nav-link text-white">
            Ver proveedores
        </Link>
              </li>
            </ul>
          )}
        </li>

        {/* CATEGORÍAS */}
      <li className="nav-item">
        <div
          className="nav-link text-white d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => toggleMenu("categorias")}
        >
          <span>
            <FaFolderOpen className="me-2" /> Categorías
          </span>
          <FaChevronDown
            style={{
              transform: open === "categorias" ? "rotate(180deg)" : "rotate(0)",
              transition: "0.3s",
            }}
          />
        </div>
        {open === "categorias" && (
          <ul className="nav flex-column ms-4 mt-2">
            <li>
              <Link to="/admin/categorias" className="nav-link text-white">
                Ver Categorías
              </Link>
            </li>
          </ul>
        )}
      </li>
          

        {/* Reportes */}
        <li className="nav-item">
          <div
            className="nav-link text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleMenu("reportes")}
          >
            <span>
              <FaClipboardList className="me-2" /> Reportes
            </span>
            <FaChevronDown
              style={{
                transform: open === "reportes" ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </div>
          {open === "reportes" && (
            <ul className="nav flex-column ms-4 mt-2">
              <li>
                <a href="/admin/reportes-productos" className="nav-link text-white">
                  Reporte de Productos
                </a>
              </li>
              <li>
                <a href="/admin/reportes-ventas" className="nav-link text-white">
                  Reporte de Ventas
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>     
    </div>
  );
}

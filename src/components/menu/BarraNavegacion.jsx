import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const perfilPath = rol === "Admin" ? "/admin/perfil" : "/vendedor/perfil";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("documento");
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        background: "#004AAD",
        padding: "0.5rem 1rem",
      }}
      className="shadow-sm"
    >
      <Container fluid>
        <Nav className="ms-auto d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-profile"
              className="d-flex align-items-center text-white text-decoration-none"
              style={{ boxShadow: "none" }}
            >
              <img
                src="/src/assets/img/default-avatar.png"
                alt="user"
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  marginRight: "8px",
                }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              
              <Dropdown.Item href={perfilPath}>Perfil</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;

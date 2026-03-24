import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clienteService from '/src/services/apiCliente.js';

const ListarCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [idBusqueda, setIdBusqueda] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [clientesPorPagina] = useState(10);
    const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            setLoading(true);
            const data = await clienteService.getClientes();
            setClientes(data);
            setError(null);
        } catch (error) {
            setError('Error al cargar los clientes');
        } finally {
            setLoading(false);
        }
    };

    const buscarCliente = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await clienteService.buscarCliente(filtro);
            setClientes(data);
            setPaginaActual(1); // Resetear página
            setError(null);
        } catch (error) {
            setError('Error al buscar los clientes');
        } finally {
            setLoading(false);
        }
    };

    const buscarClientePorId = async () => {
        if (!idBusqueda) return;

        try {
            setLoading(true);
            const cliente = await clienteService.getClientePorId(idBusqueda);
            setClientes(cliente ? [cliente] : []);
            setPaginaActual(1); // Resetear página
            setError(null);
        } catch (error) {
            setError('Cliente no encontrado o error al buscar');
            setClientes([]);
        } finally {
            setLoading(false);
        }
    };

    const eliminarCliente = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
            try {
                setLoading(true);
                await clienteService.eliminarCliente(id);
                setClientes(clientes.filter(cliente => cliente.id !== id));
                setError(null);
            } catch (error) {
                setError('Error al eliminar cliente');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const clientesPaginados = clientes.slice(
        (paginaActual - 1) * clientesPorPagina,
        paginaActual * clientesPorPagina
    );

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    if (loading) return <Spinner animation='border' variant='primary' />;
    if (error) return <Alert variant='danger'>{error}</Alert>;

    return (
        <Container fluid className="py-4">
            {/* Encabezado */}
            <Row className="align-items-center mb-4">
            <Col>
                <h2 className="fw-bold text-primary">📋 Clientes</h2>
                <p className="text-muted">Listado de clientes registrados en el sistema</p>
            </Col>
            
            </Row>

            {/* Buscador */}
            <Form onSubmit={buscarCliente} className="mb-4">
            <Row className="g-2">
                <Col md={10}>
                <Form.Control
                    type="text"
                    placeholder="🔍 Buscar cliente por documento"
                    value={idBusqueda}
                    onChange={(e) => setIdBusqueda(e.target.value)}
                    className="shadow-sm"
                />
                </Col>
                <Col md={2} className="d-flex gap-2">
                <Button
                    variant="outline-primary"
                    className="w-100 shadow-sm"
                    onClick={buscarClientePorId}
                >
                    Buscar
                </Button>
                <Button
                    variant="outline-secondary"
                    className="w-100 shadow-sm"
                    onClick={() => {
                    setIdBusqueda('');
                    setPaginaActual(1);
                    cargarClientes();
                    }}
                >
                    Limpiar
                </Button>
                </Col>
            </Row>
            </Form>

            {/* Tabla */}
            <div className="table-responsive shadow-sm rounded">
            <Table hover className="align-middle text-center mb-0">
                <thead className="table-light">
                <tr>
                    <th>Documento</th>
                    <th>Tipo Doc.</th>
                    <th>Nombre Completo</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {clientesPaginados.length > 0 ? (
                    clientesPaginados.map((cliente) => (
                    <tr key={cliente.documentoCliente}>
                        <td className="fw-semibold">{cliente.documentoCliente}</td>
                        <td>{cliente.tipoDocumentoCliente}</td>
                        <td>{`${cliente.nombreCliente} ${cliente.apellidoCliente}`}</td>
                        <td>{cliente.correoCliente || "—"}</td>
                        <td>{cliente.telefonoCliente || "—"}</td>
                        <td>
                        <div className="d-flex justify-content-center gap-2">
                            <Button
                            as={Link}
                            to={`/admin/clientes-editar/${cliente.documentoCliente}`}
                            variant="warning"
                            size="sm"
                            className="shadow-sm"
                            >
                            ✏️ Editar
                            </Button>
                            <Button
                            variant="danger"
                            size="sm"
                            className="shadow-sm"
                            onClick={() =>
                                eliminarCliente(cliente.documentoCliente)
                            }
                            >
                            🗑️ Eliminar
                            </Button>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="6" className="text-muted py-3">
                        No se encontraron clientes
                    </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </div>

            {/* Paginación */}
            <Row className="mt-4">
            <Col className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                <Button
                variant="dark"
                size="sm"
                onClick={() => cambiarPagina(1)}
                disabled={paginaActual === 1}
                >
                ⏮ Primera
                </Button>
                <Button
                variant="dark"
                size="sm"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                >
                ◀ Anterior
                </Button>

                <span className="fw-bold text-primary">
                Página {paginaActual} de {totalPaginas}
                </span>

                <Button
                variant="dark"
                size="sm"
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                >
                Siguiente ▶
                </Button>
                <Button
                variant="dark"
                size="sm"
                onClick={() => cambiarPagina(totalPaginas)}
                disabled={paginaActual === totalPaginas}
                >
                Última ⏭
                </Button>
            </Col>
            </Row>
        </Container>
        );

};

export default ListarCliente;
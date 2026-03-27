import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clienteService from '/src/services/apiCliente.js';

const ListarCliente = () => {
    const [clientes, setClientes] = useState([]);
    const [clientesOriginales, setClientesOriginales] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensajeVacio, setMensajeVacio] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);

    const clientesPorPagina = 10;
    const totalPaginas = Math.max(
        1,
        Math.ceil(clientes.length / clientesPorPagina)
    );

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            setLoading(true);
            const data = await clienteService.getClientes();
            setClientes(data);
            setClientesOriginales(data);
            setMensajeVacio('');
            setError(null);
        } catch {
            setError('Error al cargar los clientes');
        } finally {
            setLoading(false);
        }
    };

    const handleBusqueda = (valor) => {
        setBusqueda(valor);

        if (valor.trim() === '') {
            setClientes(clientesOriginales);
            setMensajeVacio('');
            setPaginaActual(1);
            return;
        }

        const texto = valor.toLowerCase();

        const filtrados = clientesOriginales.filter(cliente =>
            cliente.nombreCliente.toLowerCase().includes(texto) ||
            cliente.apellidoCliente.toLowerCase().includes(texto) ||
            cliente.documentoCliente.toString().includes(texto)
        );

        setClientes(filtrados);
        setPaginaActual(1);

        setMensajeVacio(
            filtrados.length === 0
                ? `No se encontraron clientes con: ${valor}`
                : ''
        );
    };

    const eliminarCliente = async (documentoCliente) => {
        if (!window.confirm('¿Está seguro de eliminar este cliente?')) return;

        try {
            await clienteService.eliminarCliente(documentoCliente);
            await cargarClientes();
            setPaginaActual(1);
            setMensajeVacio('');
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al eliminar cliente');
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

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-bold text-primary">📋 Clientes</h2>
                    <p className="text-muted">Listado de clientes registrados</p>
                </Col>
            </Row>

            <Form className="mb-4">
                <Row className="g-2">
                    <Col md={10}>
                        <Form.Control
                            placeholder="🔍 Buscar por nombre, apellido o documento"
                            value={busqueda}
                            onChange={(e) => handleBusqueda(e.target.value)}
                        />
                    </Col>

                    <Col md={2}>
                        <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                                setBusqueda('');
                                setClientes(clientesOriginales);
                                setMensajeVacio('');
                                setPaginaActual(1);
                            }}
                        >
                            Limpiar
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table hover responsive className="text-center">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Tipo</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesPaginados.length > 0 ? (
                        clientesPaginados.map(cliente => (
                            <tr key={cliente.documentoCliente}>
                                <td>{cliente.documentoCliente}</td>
                                <td>{cliente.tipoDocumentoCliente}</td>
                                <td>{cliente.nombreCliente} {cliente.apellidoCliente}</td>
                                <td>{cliente.correoCliente || '—'}</td>
                                <td>{cliente.telefonoCliente || '—'}</td>
                                <td>
                                    <Button
                                        as={Link}
                                        to={`/admin/clientes-editar/${cliente.documentoCliente}`}
                                        size="sm"
                                        variant="warning"
                                    >
                                        ✏️
                                    </Button>{' '}
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => eliminarCliente(cliente.documentoCliente)}
                                    >
                                        🗑️
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-muted py-3">
                                {mensajeVacio || 'No hay clientes registrados'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Row className="mt-3">
                <Col className="d-flex justify-content-center align-items-center gap-2">
                    <Button
                        size="sm"
                        disabled={paginaActual === 1}
                        onClick={() => cambiarPagina(1)}
                    >
                        ⏮
                    </Button>

                    <Button
                        size="sm"
                        disabled={paginaActual === 1}
                        onClick={() => cambiarPagina(paginaActual - 1)}
                    >
                        ◀
                    </Button>

                    <span className="fw-semibold">
                        Página {paginaActual} de {totalPaginas}
                    </span>

                    <Button
                        size="sm"
                        disabled={paginaActual === totalPaginas}
                        onClick={() => cambiarPagina(paginaActual + 1)}
                    >
                        ▶
                    </Button>

                    <Button
                        size="sm"
                        disabled={paginaActual === totalPaginas}
                        onClick={() => cambiarPagina(totalPaginas)}
                    >
                        ⏭
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ListarCliente;
import { useEffect, useState } from "react";
import { IoMdAdd, IoMdCreate, IoMdTrash } from "react-icons/io";
import { obtenerEmpleados, eliminarEmpleado, actualizarEmpleado } from "../../services/empleadoService";
import Modal from "../../components/Modal";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import "./ListarEmpleados.css";

export default function ListarEmpleados() {

    const [modalAbierto, setModalAbierto] = useState(false);
    const [empleados, setEmpleados] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [empleadoEditar, setEmpleadoEditar] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 10;

    useEffect(() => {
        const listarEmpleados = async () => {
            try {
                const data = await obtenerEmpleados();
                setEmpleados(data);
            } catch (error) {
                console.error(error);
            }
        };
        listarEmpleados();
    }, []);

    const empleadosFiltrados = empleados.filter((empleado) => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return true;

        const valores = [
            empleado.idEmpleado?.toString(),
            empleado.id?.toString(),
            empleado.nombre,
            empleado.departamento,
            empleado.telefono,
            empleado.sueldo?.toFixed(2)
        ];

        return valores.some((valor) =>
            valor?.toLowerCase().includes(term)
        );
    });

    const totalPaginas = Math.ceil(empleadosFiltrados.length / registrosPorPagina);
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const empleadosPaginados = empleadosFiltrados.slice(indiceInicial, indiceInicial + registrosPorPagina);

    const irAPagina = (pagina) => {
        setPaginaActual(pagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const abrirModal = () => {
        setEmpleadoEditar(null);
        setModalAbierto(true);
    };

    const manejarBusqueda = (e) => {
        setSearchTerm(e.target.value);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setEmpleadoEditar(null);
    };

    const manejarEmpleadoAgregado = async () => {
        try {
            const data = await obtenerEmpleados();
            setEmpleados(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEliminar = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarEmpleado(id).then(() => {
                    manejarEmpleadoAgregado();
                    toast.success('Empleado eliminado correctamente');
                }).catch((error) => {
                    toast.error('Error al eliminar empleado');
                    console.error(error);
                });
            }
        });
    };

    const handleActualizar = (id) => {
        const empleado = empleados.find(e => e.idEmpleado === id || e.id === id);
        if (empleado) {
            setEmpleadoEditar(empleado);
            setModalAbierto(true);
        }
    };

    return (
        <div className="container empleados-page">
            <div className="empleados-header">
                <div className="empleados-header-left">
                    <div>
                        <h3 className="empleados-title">Empleados</h3>
                        <p className="empleados-subtitle">Tabla con estilo premium para dar envidia a quien la mire.</p>
                    </div>
                    <div className="empleados-search">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Buscar por ID, nombre, departamento, teléfono o sueldo"
                            value={searchTerm}
                            onChange={manejarBusqueda}
                        />
                    </div>
                </div>

                <button className="btn btn-primary" onClick={abrirModal}>
                    <IoMdAdd className="me-2" /> Agregar nuevo empleado
                </button>
            </div>

            <div className="empleados-panel table-responsive">
                <table className="table table-borderless align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Sueldo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleadosPaginados.length ? (
                            empleadosPaginados.map((e) => (
                                <tr key={e.idEmpleado ?? e.id}>
                                    <th scope="row">{e.idEmpleado}</th>
                                    <td>{e.nombre}</td>
                                    <td>{e.departamento}</td>
                                    <td>{e.telefono}</td>
                                    <td>${e.sueldo?.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleActualizar(e.idEmpleado ?? e.id)}>
                                            <IoMdCreate className="me-1" /> Editar
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleEliminar(e.idEmpleado ?? e.id)}>
                                            <IoMdTrash className="me-1" /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">
                                    No se encontraron empleados que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            {empleadosFiltrados.length > 0 && (
                <div className="empleados-pagination">
                    <div className="pagination-info">
                        <span>Mostrando {indiceInicial + 1} a {Math.min(indiceInicial + registrosPorPagina, empleadosFiltrados.length)} de {empleadosFiltrados.length} registros</span>
                    </div>
                    <nav className="pagination-nav">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => irAPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}
                        >
                            ←
                        </button>

                        <div className="pagination-buttons">
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                                <button
                                    key={pagina}
                                    className={`btn btn-sm ${paginaActual === pagina ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => irAPagina(pagina)}
                                >
                                    {pagina}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => irAPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                        >
                            →
                        </button>
                    </nav>
                </div>
            )}
            </div>


            <Modal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                onEmpleadoAgregado={manejarEmpleadoAgregado}
                empleadoEditar={empleadoEditar}
            />
        </div>
    )
}
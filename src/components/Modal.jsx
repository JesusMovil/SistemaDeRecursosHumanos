import { useState, useEffect } from 'react';
import { agregarEmpleado, actualizarEmpleado } from '../services/empleadoService';
import './Modal.css';
import toast from 'react-hot-toast';

export default function Modal({ isOpen, onClose, onEmpleadoAgregado, empleadoEditar }) {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        departamento: '',
        sueldo: ''
    });

    useEffect(() => {
        if (empleadoEditar) {
            setFormData({
                nombre: empleadoEditar.nombre || '',
                telefono: empleadoEditar.telefono || '',
                departamento: empleadoEditar.departamento || '',
                sueldo: empleadoEditar.sueldo || ''
            });
        } else {
            setFormData({
                nombre: '',
                telefono: '',
                departamento: '',
                sueldo: ''
            });
        }
    }, [empleadoEditar, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosEmpleado = {
                ...formData,
                sueldo: parseFloat(formData.sueldo)
            };

            if (empleadoEditar) {
                const id = empleadoEditar.idEmpleado ?? empleadoEditar.id;
                await actualizarEmpleado(id, datosEmpleado);
                toast.success('Empleado actualizado correctamente');
            } else {
                await agregarEmpleado(datosEmpleado);
                toast.success('Empleado agregado exitosamente');
            }

            onEmpleadoAgregado();
            setFormData({
                nombre: '',
                telefono: '',
                departamento: '',
                sueldo: ''
            });
            onClose();
        } catch (error) {
            const mensaje = empleadoEditar ? 'Error al actualizar empleado' : 'Error al agregar empleado';
            toast.error(mensaje);
            console.error(mensaje, error);
        }
    };

    if (!isOpen) return null;

    const isEditing = !!empleadoEditar;
    const titulo = isEditing ? 'Editar Empleado' : 'Agregar Nuevo Empleado';
    const botonTexto = isEditing ? 'Actualizar Empleado' : 'Agregar Empleado';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{titulo}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                placeholder='Ej: Manolito'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                placeholder='Ej: 912345678'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="departamento" className="form-label">Departamento</label>
                            <input
                                type="text"
                                className="form-control"
                                id="departamento"
                                name="departamento"
                                value={formData.departamento}
                                placeholder='Ej: Recursos Humanos'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sueldo" className="form-label">Sueldo</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                id="sueldo"
                                name="sueldo"
                                value={formData.sueldo}
                                placeholder='Ej: 200'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-primary">{botonTexto}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

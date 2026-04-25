import api from "../Api";

export const obtenerEmpleados = async () => {
    try {
        const response = await api.get("/empleados");
        return response.data;
    }
    catch (error) {
        console.error("Error al obtener empleados:", error);
        throw error;
    }
};

export const agregarEmpleado = async (empleado) => {
    try {
        const response = await api.post("/empleados", empleado);
        return response.data;
    } catch (error){
        console.error("Error al agregar empleado:", error);
        throw error;
    }
}

export const actualizarEmpleado = async (id, empleado) => {
    try{
        const response = await api.patch(`/empleados/${id}`, empleado);
        return response.data;
    }catch (error){
        console.error("Error al actualizar empleado:", error);
        throw error;
    }
}

export const eliminarEmpleado = async (id) => {
    try {
        await api.delete(`/empleados/${id}`);
    }
    catch (error) {
        console.error("Error al eliminar empleado:", error);
        throw error;
    }
}
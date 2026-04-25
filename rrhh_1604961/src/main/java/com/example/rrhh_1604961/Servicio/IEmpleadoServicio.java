package com.example.rrhh_1604961.Servicio;

import com.example.rrhh_1604961.Modelos.Empleado;

import java.util.List;

public interface IEmpleadoServicio {
    public List<Empleado> listarEmpleados();
    public Empleado BuscarEmpleadoPorId(Integer IdEmpleado);
    public Empleado guardarEmpleado(Empleado empleado);
    public void EliminarEmpleado(Integer id);
    public Empleado ActualizarEmpleado(Integer id, Empleado empleado);
}

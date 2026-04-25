package com.example.rrhh_1604961.Servicio;

import com.example.rrhh_1604961.Modelos.Empleado;
import com.example.rrhh_1604961.Repositorio.EmpleadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoServicio  implements IEmpleadoServicio {

    @Autowired
    private EmpleadoRepositorio empleadoRepositorio;

    @Override
    public List<Empleado> listarEmpleados() {
        return empleadoRepositorio.findAll();
    }

    @Override
    public Empleado BuscarEmpleadoPorId(Integer IdEmpleado) {
        Empleado empleado = empleadoRepositorio.findById(IdEmpleado).orElse(null);
        return empleado;
    }

    @Override
    public Empleado guardarEmpleado(Empleado empleado) {
        return empleadoRepositorio.save(empleado);
    }

    @Override
    public void EliminarEmpleado(Integer id) {
        empleadoRepositorio.deleteById(id);
    }

    @Override
    public Empleado ActualizarEmpleado(Integer id, Empleado empleado) {
        Empleado existente = empleadoRepositorio.findById(id).orElse(null);

        if (existente != null) {
            existente.setNombre(empleado.getNombre());
            existente.setDepartamento(empleado.getDepartamento());
            existente.setSueldo(empleado.getSueldo());
            existente.setTelefono(empleado.getTelefono());

            return empleadoRepositorio.save(existente);
        }

        return null;
    }
}

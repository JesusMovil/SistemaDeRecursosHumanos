package com.example.rrhh_1604961.Controlador;

import com.example.rrhh_1604961.Modelos.Empleado;
import com.example.rrhh_1604961.Servicio.IEmpleadoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//http://localhost:8080/rrhh-app
@RequestMapping("/rrhh-app")
@CrossOrigin(value = "http://localhost:5173")

public class EmpleadoControlador {
    private static final Logger logger = LoggerFactory.getLogger(EmpleadoControlador.class);

    @Autowired
    private IEmpleadoServicio empleadoServicio;

    // Listar empleados
    //http://localhost:8080/rrhh-app/empleados

    @GetMapping("/empleados")
    public List<Empleado> listarEmpleados() {
        var empleados = empleadoServicio.listarEmpleados();
        empleados.forEach((empleado) -> logger.info(empleado.toString()));
        return empleados;
    }

    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado) {
        logger.info("Empleado agregado: " + empleado);
        return empleadoServicio.guardarEmpleado(empleado);
    }

    @DeleteMapping("/empleados/{id}")
    public void eliminarEmpleado(@PathVariable Integer id) {
        logger.info("Empleado eliminado con id: " + id);
        empleadoServicio.EliminarEmpleado(id);
    }

    @PatchMapping("/empleados/{id}")
    public Empleado actualizarEmpleado(@PathVariable Integer id, @RequestBody Empleado empleado) {
        logger.info("Empleado actualizado con id: " + id);
        return empleadoServicio.ActualizarEmpleado(id, empleado);
    }

    @GetMapping("/empleados/{id}")
    public Empleado obtenerEmpleadosporId(@RequestParam Integer IdEmpleado) {
        var Empleado = empleadoServicio.BuscarEmpleadoPorId(IdEmpleado);
        return Empleado;
    }
}

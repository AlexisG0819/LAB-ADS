import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Estudiante } from '../interfaces/estudiante.interface';
@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private readonly http = inject(HttpClient);
  constructor() {}
  // Obtener lista de estudiantes
  obtenerEstudiantesPorID() {
    return this.http.get<Estudiante[]>(endpoints.obtenerEstudiantePorID);
  }
  // Obtener estudiante por ID
  obtenerEstudiantes(idEstudiante: number) {
    return this.http.get<Estudiante>(
      endpoints.obtenerEstudiantes.replace(':idEstudiante', idEstudiante.toString())
    );
  }
  // Insertar estudiante
  agregarEstudiante(estudiante: Estudiante) {
    // Se arma el objeto a enviar
    let body = {
      nombre: estudiante.nombresEstudiante,
      apellido: estudiante.apellidosEstudiante,
      codigo: estudiante.codigoEstudiante,
      correo: estudiante.correoEstudiante,
    };
    return this.http.post<any>(endpoints.agregarEstudiante, body);
  }
  // Eliminar un estudiante
  eliminarEstudiante(idEstudiante: number) {
    return this.http.delete<any>(
      endpoints.eliminarEstudiante.replace(':idEstudiante', idEstudiante.toString())
    );
  }

  // Actualizar estudiante
  actualizarEstudiante(idEstudiante: number, estudiante: Estudiante) {
    // Se arma el objeto a enviar
    let body = {
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombresEstudiante,
      apellido: estudiante.apellidosEstudiante,
      codigo: estudiante.codigoEstudiante,
      correo: estudiante.correoEstudiante,
    };
    return this.http.patch<number>(
      endpoints.actualizarEstudiante.replace(':idEstudiante', idEstudiante.toString()),
      body
    );
  }
}
import { environment } from "../../environments/environment.development";

export const endpoints = {
  // **Estudiantes**
  agregarEstudiante:
  environment.serverUrl.concat('api/estudiantes/agregarEstudiante'), 
  actualizarEstudiante:
  environment.serverUrl.concat('api/estudiantes/actualizarEstudiante/:idEstudiante'),
  eliminarEstudiante:
  environment.serverUrl.concat('api/estudiantes/eliminarEstudiante/:idEstudiante'),
  obtenerEstudiantePorID:
  environment.serverUrl.concat('api/estudiantes/obtenerEstudiantePorID/:idEstudiante'),
  obtenerEstudiantes:
  environment.serverUrl.concat('api/estudiantes/obtenerEstudiantes'),
        //******************
};
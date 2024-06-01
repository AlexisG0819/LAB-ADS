import { environment } from "../../environments/environment.development";

export const endpoints = {
  // **Estudiantes**
  agregarEstudiante: environment.serverUrl.concat('api/estudiantes/agregarEstudiante'), 
  actualizarEstudiante: environment.serverUrl.concat('api/estudiantes/actualizarEstudiante/:idEstudiante'),
  eliminarEstudiante: environment.serverUrl.concat('api/estudiantes/eliminarEstudiante/:idEstudiante'),
  obtenerEstudiantes: environment.serverUrl.concat('api/estudiantes/obtenerEstudiantes'),
  obtenerEstudiantePorID: environment.serverUrl.concat('api/estudiantes/obtenerEstudiantePorID/:idEstudiante'),
  
        //******************
        // **Carrera**
  agregarCarrera: environment.serverUrl.concat('apis/Carrera/agregarCarrera'),
  actualizarCarrera: environment.serverUrl.concat('apis/Carrera/actualizarCarrera/:idCarrera'),
  eliminarCarrera: environment.serverUrl.concat('apis/Carrera/eliminarCarrera/:idCarrera'),
  obtenerCarreras: environment.serverUrl.concat('apis/Carrera/obtenerCarrera'),
  obtenerCarreraPorID: environment.serverUrl.concat('apis/Carrera/obtenerCarreraPorID/:idCarrera')
  

}
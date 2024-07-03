import { Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { AgregarEstudianteComponent } from './estudiantes/agregar-estudiante/agregar-estudiante.component';
import { CarrerasComponent } from './carrera/carrera.component';
import { AgregarCarreraComponent } from './carrera/agregar-carrera/agregar-carrera.component';

export const routes: Routes = [
    {path: '', component: EstudiantesComponent, pathMatch: 'full'}, // Ruta por defecto
      { path:'agregarEstudiante', component: AgregarEstudianteComponent},
      { path:'agregarEstudiante/:idEstudiante', component: AgregarEstudianteComponent},

      //patch de Carreras
      {path: '', component: CarrerasComponent, pathMatch: 'full'}, // Ruta por defecto
      { path:'agregarCarrera', component: AgregarCarreraComponent},
      { path:'agregarCarrera/:idCarrera', component: AgregarCarreraComponent}
    //{path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes
    ];
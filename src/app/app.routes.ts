import { Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { AgregarEstudianteComponent } from './estudiantes/agregar-estudiante/agregar-estudiante.component';

export const routes: Routes = [
    {path: '', component: EstudiantesComponent, pathMatch: 'full'}, // Ruta por defecto
      { path:'agregarEstudiante', component: AgregarEstudianteComponent},
      { path:'agregarEstudiante/:idEstudiante', component:
    AgregarEstudianteComponent},
    //{path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes
    ];
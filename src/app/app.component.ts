import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstudiantesService } from './services/estudiantes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GestionAcademica';

  //Haciendo inyeccion de dependencias
  private readonly estudiantesService = inject(EstudiantesService);

  //creando observable
  estudiantes$ = this.estudiantesService.obtenerEstudiantes();
}

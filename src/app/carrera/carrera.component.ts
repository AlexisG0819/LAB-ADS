import { Component, OnInit, inject } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { CommonModule } from '@angular/common';
import { Carrera } from '../interfaces/carrera.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';

@Component ({
    selector: 'app-carrera',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../carrera/carrera.componet.html',
    styleUrls: ['../carrera/carrera.component.scss'],
    //styleUrl: './carrera.component.scss',
})
export class CarrerasComponent implements OnInit{
    //Inyeccion de dependencias
    private readonly carreraService = inject(CarrerasService);
    private readonly router = inject(Router);
    //Arreglo para almacenar el listado de carreras
    lstCarrera: Carrera[];
    constructor(){
        //Es necesario inicializar el arreglo anteriormente creado
        this.lstCarrera = [];
    }
    ngOnInit(): void {
        this.getAllCarreras();
    }
    //Obtener lista de carreras
    getAllCarreras(){
        this.carreraService.obtenerCarreras().subscribe({
            //Se evalua que la respuesta del endpoint sea exitosa
            next: (temp) =>{
                //Se asigna la lista al arreglo anteriormente descrito
                this.lstCarrera = temp;
            },
            //En caso de error
            error: (err) =>{
                console.log('No se pudo obtener informacion');
            },
        })
    }
    //Metodo que permite navegar al formulario para insertar carreras
    navigateToForm(){
        this.router.navigate(['/agregarCarrera']);
    }
    //Eliminar una carrera
    deleteCarrera(event: any){
        Swal.fire({
            title: '¿Quiere eliminar este registro?',
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
        }).then((result) =>{
            this.carreraService
            .eliminarCarrera(event.target.value)
            .subscribe({
                //En caso de exito
                next: (temp) =>{
                    Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
                    //Refrescar la lista de carreras
                    this.getAllCarreras();
                },
                //En caso de error
                error: (err) =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar',
                        text: parsearErroresAPI(err).toString(),
                    })
                }
            })
        })
    }
    updateCarrera(valor: number){
        //Viajando al componente de actualizar carrera
        //Primero se valida que exista un valor(es decir que sea distinto de nulo)
        if(valor){
            //Como puede notarse, ahora se aneza el valor a la redireccion. Ej. /agregarCarrera/3;
            this.router.navigate(['/agregarCarrera', valor]);
        }
    }
}

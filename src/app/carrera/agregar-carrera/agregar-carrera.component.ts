import { Component, OnInit, inject } from '@angular/core';
import {FormGroup,FormBuilder,Validators,ReactiveFormsModule,} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Carrera } from '../../interfaces/carrera.interface';
import { CarrerasService } from '../../services/carreras.service';
import { parsearErroresAPI } from '../../utils/Utilities';
import { Location } from '@angular/common';

@Component({
    selector: 'app-agregar-carrera',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './agregar-carrera.component.html',
    styleUrl: './agregar-carrera.component.scss',
    //styleUrl: './carrera.component.scss',
})

export class AgregarCarreraComponent implements OnInit{
    // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
    form: FormGroup;
    // Creacion de objeto que se enviara a traves del endpoint
    formCarrera: Carrera;
    // Variable que permite manejar la subscripcion al observable de ruta.
    onRouteStart!: Subscription;
    // Variable que almacena el ID del estudiante
    idCarrera!: number;

    // Inyeccion de dependencias
    private readonly formBuilder = inject(FormBuilder);
    private readonly carreraService = inject(CarrerasService);
    private readonly router = inject(Router);
    private readonly activedRoute = inject(ActivatedRoute);
    private readonly location = inject(Location);

    constructor(){
        //Se inicializa el objeto carrera que se enviara
        this.formCarrera = {} as Carrera;
        //Se inicia el controlador del formulario
        this.form = this.formBuilder.group({
            codigo : ['', [Validators.required]],
            nombre : ['', [Validators.required]],
        })
    }
    ngOnInit(): void {
        // Se inicializa el observable de la ruta
        this.onRouteStart = this.activedRoute.params.subscribe((temp) =>{
            // Se almacena el valor capturado en la ruta
            this.idCarrera = temp['idCarrera'];
        })
        // Se valida que el valor del id sea mayor a cero y distinto de nulo
        if(this.idCarrera && this.idCarrera > 0){
            // Es edicion
            // Se consulta la informacion de la carrera, para rellenar el formulario
            this.carreraService.obtenerCarreraPorID(this.idCarrera).subscribe({
                next: (temp) =>{
                    this.formCarrera = temp;
                    // Se rellena la informacion del formulario
                    this.form.controls['codigo'].setValue(
                        this.formCarrera.codigoCarrera
                    );
                    this.form.controls['nombre'].setValue(
                        this.formCarrera.nombreCarrera
                    );
                },
                error: (err) =>{
                    console.log('Error',err);
                }
            })
        }
    }
    onSubmit(){
        //Asignacion de valores al objeto carrera
        this.formCarrera.codigoCarrera = this.form.get('codigo')?.value;
        this.formCarrera.nombreCarrera = this.form.get('nombre')?.value;

        //Mostrar dialogo 
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Guardando registro, espere por favor...',
        })
        Swal.showLoading();
        // Se valida si la variable id contiene valor, los escenarios son:
        // 1. Si el id existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
        // 2. Si el id no existe entonces se debe realizar una inserccion
        if(this.idCarrera && this.idCarrera > 0){
            this.carreraService
            .actualizarCarrera(this.idCarrera,this.formCarrera)
            .subscribe({
                //Respuesta exitosa
                next: (temp) =>{
                    Swal.fire(
                        'Actualizado',
                        'Registro actualizado correctamente',
                        'success'
                    )
                    //Navega hacia atras
                    //this.router.navigate(['/carreras']);
                    this.location.back();
                },
                //EN caso de error
                error: (err) =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar Carrera',
                        text: parsearErroresAPI(err).toString(),
                    })
                }
            })
        }else{
            //Es insercion
            this.carreraService.agregarCarrera(this.formCarrera).subscribe({
                //Respuesta exitosa
                next: (temp) =>{
                    Swal.fire('Registrado','Registro insertado correctamente','success')
                    //Navega hacia atras
                    //this.router.navigate(['/carreras']);
                    this.location.back();
                },
                //En caso de error
                error: (err) =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al insertar Carrera',
                        text: parsearErroresAPI(err).toString(),
                    })
                }
            })
        }
    }
    /* Funcion que permite validar los campos del formulario
    trabaja evaluando si el campo ha sido manipulado o esta vacio*/
    validateField(field: string){
        return this.form.get(field)?.invalid && this.form.get(field)?.touched;
    }
}
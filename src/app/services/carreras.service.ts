import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Carrera } from '../interfaces/carrera.interface';

@Injectable({
    providedIn: 'root',
})
export class CarrerasService{
    private readonly http = inject(HttpClient);
    constructor(){}
        //Obtener lista de carreras
        obtenerCarreras(){
            return this.http.get<Carrera[]>(endpoints.obtenerCarreras);
        }
        //Obtener carrera por ID
        obtenerCarreraPorID(idCarrera: number){
            return this.http.get<Carrera>(
                endpoints.obtenerCarreras.replace(':idCarrera', idCarrera.toString())
            );
        }
        //Insertar carrera
        agregarCarrera(carrera: Carrera){
            //Se arma el objeto a enviar
            let body = {
                nombre: carrera.nombreCarrera,
                codigo: carrera.codigoCarrera,
            };
            return this.http.post<any>(endpoints.agregarCarrera, body);
        }
        //Eliminar una carrera
        eliminarCarrera(idCarrera: number){
            return this.http.delete<any>(
                endpoints.eliminarCarrera.replace(':idCarrera', idCarrera.toString())
            );
        }
        //Actualizar carrera
        actualizarCarrera(idCarrera: number, carrera: Carrera){
            //Se arma el objeto a enviar
            let body = {
                idCarrera: carrera.idCarrera,
                nombre: carrera.nombreCarrera,
                codigo: carrera.codigoCarrera,
            };
            return this.http.patch<number>(
                endpoints.actualizarCarrera.replace(':idCarrera', idCarrera.toString()),
                body
            );
        }
}

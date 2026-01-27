import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coleccion } from '../modelos/coleccion.model';
import {ColeccionRequest} from "../modelos/coleccion.request.model";

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {
  private apiUrl = 'http://localhost:8080/api/colecciones';

  private http = inject(HttpClient);

  constructor() { }

  crearColeccion(coleccion: ColeccionRequest): Observable<Coleccion> {
    return this.http.post<Coleccion>(`${this.apiUrl}/crear`, coleccion);
  }

  obtenerColeccionesUsuario(usuarioId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  obtenerColeccionPorId(id: number): Observable<Coleccion> {
    return this.http.get<Coleccion>(`${this.apiUrl}/${id}`);
  }
}

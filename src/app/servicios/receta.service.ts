import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receta } from '../modelos/receta.model';
import { Observable } from 'rxjs';
import {RecetaMasGuardada, RecetaMasGuardadaConUsuarios} from "../modelos/receta-masguardada.model";
import {RecetaRequest} from "../modelos/receta-request.model";

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/receta';

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }
  getRecetaById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }

  filtrarPorPreferencias(preferenciaIds: number[]): Observable<Receta[]> {
    const body = preferenciaIds.length ? preferenciaIds : [];
    return this.http.post<Receta[]>(`${this.apiUrl}/recetas/filtro`, body);
  }

  guardarReceta(idReceta: number, idUsuario: number): Observable<Receta> {
    return this.http.post<Receta>(`${this.apiUrl}/${idReceta}/guardar/${idUsuario}`, {});
  }

  quitarRecetaGuardada(idReceta: number, idUsuario: number): Observable<Receta> {
    return this.http.delete<Receta>(`${this.apiUrl}/${idReceta}/guardar/${idUsuario}`);
  }

  recetaYaGuardada(idReceta: number, idUsuario: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${idReceta}/ya-guardada/${idUsuario}`);
  }

  getRecetasGuardadas(idUsuario: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/guardadas/${idUsuario}`);
  }

  getRecetaMasGuardada(): Observable<RecetaMasGuardada> {
    return this.http.get<RecetaMasGuardada>(`${this.apiUrl}/mas-guardada`);
  }

  getRecetaMasGuardadaPorUsuario(): Observable<RecetaMasGuardadaConUsuarios> {
    return this.http.get<RecetaMasGuardadaConUsuarios>(`${this.apiUrl}/receta-mas-guardada-con-usuario`);
  }

  crearReceta(receta: RecetaRequest): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl, receta);
  }

  eliminarReceta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarReceta(id: number, receta: RecetaRequest): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta);
  }
}

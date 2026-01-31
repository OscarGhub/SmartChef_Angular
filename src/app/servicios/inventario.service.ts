import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventarioItem } from '../modelos/inventario.model';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private http = inject(HttpClient);
  private apiUrl = 'https://springboot-smartchef.onrender.com/api/inventario';

  getInventarioPorUsuario(usuarioId: number): Observable<InventarioItem[]> {
    return this.http.get<InventarioItem[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  crearInventario(usuarioId: number): Observable<any> {
    const url = `${this.apiUrl}/inventario`;
    const body = { usuarioId: usuarioId };
    return this.http.post(url, body);
  }

  agregarIngredienteAlInventario(idInventario: number, idIngrediente: number, cantidad: number): Observable<any> {
    const url = `${this.apiUrl}/${idInventario}/ingredientes/${idIngrediente}`;
    const payload = { cantidad };

    return this.http.post<any>(url, payload);
  }

  eliminarIngredienteDelInventario(idInventario: number, idIngrediente: number): Observable<void> {
    const url = `${this.apiUrl}/${idInventario}/${idIngrediente}`;
    return this.http.delete<void>(url);
  }

  getInventarioDetalladoPorUsuario(usuarioId: number): Observable<any[]> {
    const url = `${this.apiUrl}/usuario/${usuarioId}`;
    return this.http.get<any[]>(url);
  }

}

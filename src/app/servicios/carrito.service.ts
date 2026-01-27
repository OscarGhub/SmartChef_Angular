import {Observable} from "rxjs";
import {ListaCompraIngrediente} from "../modelos/carrito.model";
import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/carrito';
  private ingredienteApiUrl = 'http://localhost:8080/api/ingrediente';

  getIngredientes(idLista: number): Observable<ListaCompraIngrediente[]> {
    return this.http.get<ListaCompraIngrediente[]>(`${this.apiUrl}/${idLista}/ingredientes`);
  }

  getIngredientesPorUsuario(idUsuario: number): Observable<ListaCompraIngrediente[]> {
    return this.http.get<ListaCompraIngrediente[]>(`${this.ingredienteApiUrl}/usuario/${idUsuario}/ingredientes`);
  }

  anadirRecetaAlCarrito(idUsuario: number, idReceta: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/usuario/${idUsuario}/receta/${idReceta}`, {}, { responseType: 'text' });
  }

  eliminarRecetaDelCarrito(idUsuario: number, idReceta: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/usuario/${idUsuario}/receta/${idReceta}`, { responseType: 'text' });
  }

  recetaEstaEnCarrito(idUsuario: number, idReceta: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/usuario/${idUsuario}/receta/${idReceta}/existe`);
  }
}

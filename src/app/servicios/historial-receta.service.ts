import {Observable} from "rxjs";
import {RecetaUso} from "../modelos/receta-uso.model";
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecetaUsoRequest} from "../modelos/receta-uso-request.model";

export class HistorialRecetaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/historial';

  guardarRecetaDia(dto: RecetaUsoRequest): Observable<RecetaUso> {
    return this.http.post<RecetaUso>(`${this.apiUrl}/receta-dia`, dto);
  }

  getRecetasUltimaSemana(): Observable<RecetaUso[]> {
    return this.http.get<RecetaUso[]>(`${this.apiUrl}/recetas-semanal`);
  }
}

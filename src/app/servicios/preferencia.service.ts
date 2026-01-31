import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Preferencia {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://springboot-smartchef.onrender.com/api/preferencias';

  getPreferencias(): Observable<Preferencia[]> {
    return this.http.get<Preferencia[]>(this.apiUrl);
  }
}

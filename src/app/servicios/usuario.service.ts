import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';
import { tap, catchError } from 'rxjs/operators';
import { AlertService } from '../servicios-ayuda/alert.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private alertService = inject(AlertService);
  private apiUrl = 'http://localhost:8080/api/usuario';
  private usuarioKey = 'usuarioActual';

  private manejarError<T>(mensaje: string, result: T = {} as T) {
    return (error: any): Observable<T> => {
      console.error(mensaje, error);
      this.alertService.mostrarAlerta('Error', mensaje);
      return of(result);
    };
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(this.manejarError<Usuario[]>('Error al obtener usuarios', []))
    );
  }

  crearUsuario(usuario: Usuario, confirmarContrasena: string): Observable<Usuario> {
    const payload = { ...usuario, confirmarContrasena };
    return this.http.post<Usuario>(this.apiUrl, payload).pipe(
      tap((u) => this.guardarUsuario(u)),
      catchError((err) => {
        const mensaje = err.error?.message || 'Error al crear usuario';
        this.alertService.mostrarAlerta('Error', mensaje);
        return throwError(() => new Error(mensaje));
      })
    );
  }

  getUsuarioPorCorreo(correo: string): Observable<Usuario | null> {
    return this.http.get<Usuario>(`${this.apiUrl}/correo/${correo}`).pipe(
      tap((u) => this.guardarUsuario(u)),
      catchError(this.manejarError<Usuario | null>('Usuario no encontrado', null))
    );
  }

  actualizarCorreo(id: number, nuevoCorreo: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}/correo`, { correoElectronico: nuevoCorreo }).pipe(
      tap((u) => this.guardarUsuario(u)),
      catchError(this.manejarError<Usuario>('Error al actualizar correo'))
    );
  }

  actualizarUsuario(id: number, payload: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, payload).pipe(
      tap((u) => this.guardarUsuario(u)),
      catchError(this.manejarError<Usuario>('Error al actualizar usuario'))
    );
  }

  actualizarFoto(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/foto`, formData).pipe(
      catchError(this.manejarError<any>('Error al actualizar foto'))
    );
  }

  obtenerUsuario(): Usuario | null {
    const usuario = localStorage.getItem(this.usuarioKey);
    return usuario ? JSON.parse(usuario) : null;
  }

  obtenerUsuarioId(): number | null {
    return this.obtenerUsuario()?.id ?? null;
  }

  logout() {
    localStorage.removeItem(this.usuarioKey);
  }

  private guardarUsuario(usuario: Usuario) {
    const usuarioActual = this.obtenerUsuario();
    if (usuarioActual?.id !== usuario.id) {
      localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
    }
  }
}

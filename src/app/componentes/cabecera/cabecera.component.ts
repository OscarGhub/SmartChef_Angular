import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {IonAvatar, IonButton, IonButtons, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    IonButtons,
    IonToolbar
  ]
})
export class CabeceraComponent implements OnInit {

  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  fotoPerfilUrl: string = '../../../assets/images/perfil.png';
  correoValido: boolean = false;

  constructor() { }

  ngOnInit() {
    const correo = localStorage.getItem('correoElectronico');

    if (correo && this.validarCorreo(correo)) {
      this.usuarioService.getUsuarioPorCorreo(correo).subscribe({
        next: usuario => {
          if (usuario && usuario.id) {
            this.correoValido = true;
            this.actualizarFotoPerfil(usuario.id);
          } else {
            this.resetearSesion();
          }
        },
        error: () => this.resetearSesion()
      });
    } else {
      this.resetearSesion();
    }
  }

  private resetearSesion() {
    console.warn('Correo inválido o usuario no encontrado. Redirigiendo a login.');
    this.correoValido = false;
    localStorage.removeItem('correoElectronico');
    this.router.navigate(['/login']);
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  actualizarFotoPerfil(usuarioId: number) {
    const timestamp = new Date().getTime();
    this.fotoPerfilUrl = `https://springboot-smartchef.onrender.com/api/usuario/${usuarioId}/foto?t=${timestamp}`;
  }

  goToPerfil() {
    if (this.correoValido) {
      this.router.navigate(['/perfil']);
    } else {
      console.warn('No se puede ir al perfil: usuario no válido');
      this.router.navigate(['/login']);
    }
  }

  onImageError() {
    this.fotoPerfilUrl = '../../../assets/images/perfil.png';
  }
}

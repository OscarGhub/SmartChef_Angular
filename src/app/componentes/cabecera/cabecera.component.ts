import {Component, OnInit, inject} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from 'src/app/servicios/usuario.service';
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

  fotoPerfilUrl: string = 'assets/images/perfil.png';
  correoValido: boolean = false;

  constructor() {
  }

  ngOnInit() {
    const correo = localStorage.getItem('correoElectronico');

    if (correo && this.validarCorreo(correo)) {
      this.usuarioService.getUsuarioPorCorreo(correo).subscribe({
        next: usuario => {
          if (usuario && usuario.id) {
            this.correoValido = true;
            this.gestionarFotoPerfil(usuario);
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

  private gestionarFotoPerfil(usuario: any) {
    this.fotoPerfilUrl = this.usuarioService.getFotoUrl(usuario.fotoUrl ?? null);
  }

  private resetearSesion() {
    this.correoValido = false;
    localStorage.removeItem('correoElectronico');
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/login']);
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  goToPerfil() {
    if (this.correoValido) {
      this.router.navigate(['/perfil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onImageError() {
    this.fotoPerfilUrl = 'assets/images/perfil.png';
  }
}

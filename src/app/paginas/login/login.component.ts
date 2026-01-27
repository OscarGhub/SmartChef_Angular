import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { AlertService } from '../../servicios-ayuda/alert.service';
import * as bcrypt from 'bcryptjs';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginComponent {
  private usuarioService = inject(UsuarioService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  correoElectronico: string = '';
  contrasena: string = '';

  async login(): Promise<void> {
    if (!this.correoElectronico.trim() || !this.contrasena.trim()) {
      await this.alertService.mostrarAlerta(
        'Campos incompletos',
        'Por favor ingresa correo y contraseña.'
      );
      return;
    }

    this.usuarioService.getUsuarioPorCorreo(this.correoElectronico).subscribe({
      next: async (usuario) => {
        if (!usuario) {
          await this.alertService.mostrarAlerta('Error', 'Usuario no encontrado.');
          return;
        }

        const match = bcrypt.compareSync(this.contrasena, usuario.contrasena);

        if (match) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          localStorage.setItem('correoElectronico', usuario.correoElectronico);

          await this.alertService.mostrarAlerta('Éxito', 'Has iniciado sesión correctamente.');
          this.router.navigate(['/inicio']);
        } else {
          await this.alertService.mostrarAlerta('Error', 'Contraseña incorrecta.');
        }
      },
      error: async () => {
        await this.alertService.mostrarAlerta('Error', 'No se pudo iniciar sesión. Intenta más tarde.');
      },
    });
  }
}

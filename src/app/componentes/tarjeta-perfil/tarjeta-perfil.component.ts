import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AlertService } from '../../servicios-ayuda/alert.service';
import { UsuarioService } from '../../servicios/usuario.service';
import {IonAvatar, IonButton, IonCard, IonCardContent, IonInput, IonText} from "@ionic/angular/standalone";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tarjeta-perfil',
  templateUrl: './tarjeta-perfil.component.html',
  styleUrls: ['./tarjeta-perfil.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonAvatar, IonCardContent, IonCard, IonButton, IonText, IonInput]
})
export class TarjetaPerfilComponent implements OnInit {
  private router = inject(Router);
  private alertService = inject(AlertService);
  private usuarioService = inject(UsuarioService);

  usuario: any = null;
  editarFecha = false;
  editarEmail = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuario = JSON.parse(data);
      if (this.usuario?.id && this.usuario.fotoUrl) {
        this.usuario.fotoUrl = this.getFotoUrl(this.usuario.id);
      }
    }
  }

  protected getFotoUrl(usuarioId: number): string {
    return `https://springboot-smartchef.onrender.com/api/usuario/${usuarioId}/foto?t=${new Date().getTime()}`;
  }

  toggleEditar(campo: 'fechaNacimiento' | 'correoElectronico') {
    if (campo === 'fechaNacimiento') this.editarFecha = !this.editarFecha;
    if (campo === 'correoElectronico') this.editarEmail = !this.editarEmail;
  }

  irAInventario() {
    this.router.navigate(['/inventario']);
  }

  async guardarCampo(campo: 'fechaNacimiento' | 'correoElectronico') {
    if (!this.usuario?.id) return;

    try {
      let usuarioActualizado;

      if (campo === 'correoElectronico') {
        usuarioActualizado = await firstValueFrom(
          this.usuarioService.actualizarCorreo(this.usuario.id, this.usuario.correoElectronico)
        );
        this.editarEmail = false;
      } else if (campo === 'fechaNacimiento') {
        const payload = { fecha_nacimiento: this.usuario.fechaNacimiento };
        usuarioActualizado = await firstValueFrom(
          this.usuarioService.actualizarUsuario(this.usuario.id, payload)
        );
        this.editarFecha = false;
      }

      this.usuario = {
        ...usuarioActualizado,
        fotoUrl: this.usuario.id ? this.getFotoUrl(this.usuario.id) : this.usuario.fotoUrl
      };

      localStorage.setItem('usuario', JSON.stringify(this.usuario));

      await this.alertService.mostrarAlerta('Éxito', 'Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      await this.alertService.mostrarAlerta('Error', 'No se pudo actualizar. Intenta más tarde.');
    }
  }

  seleccionarArchivo() {
    this.fileInput.nativeElement.click();
  }

  onImageError($event: ErrorEvent) {
    this.usuario.fotoUrl = '../../../assets/images/perfil.png';
  }

  async cambiarFoto() {
    if (!this.usuario?.id) return;

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        promptLabelHeader: 'Cambiar foto',
        promptLabelPhoto: 'Elegir de la galería',
        promptLabelPicture: 'Hacer una foto'
      });

      const response = await fetch(image.webPath!);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('foto', blob, `perfil_${this.usuario.id}.jpg`);

      const usuarioActualizado = await firstValueFrom(
        this.usuarioService.actualizarFoto(this.usuario.id, formData)
      );

      this.usuario = {
        ...this.usuario,
        ...usuarioActualizado,
        fotoUrl: this.getFotoUrl(this.usuario.id)
      };

      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      await this.alertService.mostrarAlerta('Éxito', 'Foto actualizada correctamente');

    } catch (error) {
      console.error('Error al actualizar foto:', error);
      if (error !== 'User cancelled photos app') {
        await this.alertService.mostrarAlerta('Error', 'No se pudo actualizar la foto.');
      }
    }
  }

}

import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AlertController, IonicModule, ModalController} from '@ionic/angular';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Receta} from '../../modelos/receta.model';
import {RecetaService} from '../../servicios/receta.service';
import {CarritoService} from '../../servicios/carrito.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-tarjeta-receta-extendida',
  templateUrl: './tarjeta-receta-extendida.component.html',
  styleUrls: ['./tarjeta-receta-extendida.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule]
})
export class TarjetaRecetaExtendidaComponent implements OnInit {
  @Input() receta?: Receta & { enCarrito?: boolean };
  @Output() cambioFavorito = new EventEmitter<void>();

  private router = inject(Router);
  private recetaService = inject(RecetaService);
  private carritoService = inject(CarritoService);
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);

  private usuario?: { id: number };

  ngOnInit() {
    this.usuario = this.getUsuario();
    if (!this.usuario || !this.receta) return;

    this.marcarYaGuardada();
    this.marcarEnCarrito();
  }

  private getUsuario() {
    const usuarioData = localStorage.getItem('usuario');
    if (!usuarioData) return undefined;
    try {
      return JSON.parse(usuarioData);
    } catch {
      return undefined;
    }
  }

  private async marcarYaGuardada() {
    if (!this.receta || !this.usuario) return;
    try {
      this.receta.yaGuardada = await firstValueFrom(
        this.recetaService.recetaYaGuardada(this.receta.id!, this.usuario.id)
      );
    } catch (err) {
      console.error('Error comprobando si la receta ya está guardada', err);
    }
  }

  private async marcarEnCarrito() {
    if (!this.receta || !this.usuario) return;

    try {
      this.receta.enCarrito = await firstValueFrom(
        this.carritoService.recetaEstaEnCarrito(this.usuario.id, this.receta.id!)
      );
    } catch (err) {
      console.error('Error comprobando si la receta está en el carrito', err);
      this.receta.enCarrito = false;
    }
  }
  async toggleCarrito(event: Event, receta: Receta) {
    event.stopPropagation();
    if (!receta || !this.usuario) return;

    const idUsuario = this.usuario.id;

    try {
      if (receta.enCarrito) {
        await firstValueFrom(this.carritoService.eliminarRecetaDelCarrito(idUsuario, receta.id!));
        receta.enCarrito = false;
      } else {
        await firstValueFrom(this.carritoService.anadirRecetaAlCarrito(idUsuario, receta.id!));
        receta.enCarrito = true;
      }
    } catch (err) {
      console.error('Error al actualizar la receta en el carrito', err);
    }
  }

  async toggleFavorito(event: Event) {
    event.stopPropagation();
    if (!this.receta || !this.usuario) return;

    try {
      let recetaActualizada: any;

      if (!this.receta.yaGuardada) {
        recetaActualizada = await firstValueFrom(
          this.recetaService.guardarReceta(this.receta.id!, this.usuario.id)
        );
        this.receta.yaGuardada = true;
      } else {
        recetaActualizada = await firstValueFrom(
          this.recetaService.quitarRecetaGuardada(this.receta.id!, this.usuario.id)
        );
        this.receta.yaGuardada = false;
      }

      if (recetaActualizada && recetaActualizada.numFavoritos !== undefined) {
        this.receta.numFavoritos = recetaActualizada.numFavoritos;
      }

      this.cambioFavorito.emit();

    } catch (err) {
      console.error('Error al guardar/quitar receta', err);
    }
  }

  goToReceta() {
    if (this.receta?.id) this.router.navigate(['/receta', this.receta.id]);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '../../../assets/images/receta.png';
  }

  async abrirModalEditar(event: Event) {
    event.stopPropagation();
    if (!this.receta) return;

    const { FormularioRecetaComponent } = await import('../formulario-receta/formulario-receta.component');

    const modal = await this.modalCtrl.create({
      component: FormularioRecetaComponent,
      componentProps: {
        recetaAEditar: this.receta
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.receta = { ...this.receta, ...data };
      console.log('Receta actualizada desde el modal:', this.receta);
      this.cambioFavorito.emit();
    }
  }

  async eliminarReceta(event: Event) {
    event.stopPropagation();

    if (!this.receta || !this.receta.id) return;

    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que quieres eliminar la receta "${this.receta.titulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { console.log('Eliminación cancelada'); }
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          cssClass: 'alert-danger-button',
          handler: async () => {
            try {
              await firstValueFrom(this.recetaService.eliminarReceta(this.receta!.id!));

              console.log('Receta eliminada con éxito:', this.receta!.titulo);

              this.cambioFavorito.emit();
            } catch (err) {
              console.error('Error al intentar eliminar la receta', err);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}

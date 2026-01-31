import { Component, inject, OnInit } from '@angular/core';
import { CabeceraComponent } from "../../componentes/cabecera/cabecera.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { TarjetaInventarioComponent } from "../../componentes/tarjeta-inventario/tarjeta-inventario.component";
import { UsuarioService } from '../../servicios/usuario.service';
import { InventarioService } from '../../servicios/inventario.service';
import { Usuario } from '../../modelos/usuario.model';
import { CommonModule } from '@angular/common';
import { IonContent, IonFooter, IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    TarjetaInventarioComponent,
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonFooter
  ]
})
export class InventarioComponent implements OnInit {

  usuario?: Usuario | null;
  usuarioCargado: boolean = false;

  private usuarioService = inject(UsuarioService);
  private inventarioService = inject(InventarioService);

  ngOnInit() {
    this.inicializarUsuario();
  }

  private inicializarUsuario() {
    const data = localStorage.getItem('usuario');

    if (!data) {
      this.usuarioCargado = true;
      return;
    }

    try {
      const usuarioLocal = JSON.parse(data);
      const correo = usuarioLocal?.correoElectronico;

      if (!correo) {
        this.usuarioCargado = true;
        return;
      }

      this.usuarioService.getUsuarioPorCorreo(correo).subscribe({
        next: (u) => {
          if (u && u.id) {
            this.usuario = u;
            this.usuarioCargado = true;
            this.gestionarInventario(u.id);
          }
        },
        error: (err) => {
          console.error('Error obteniendo usuario del servidor', err);
          this.usuarioCargado = true;
        }
      });
    } catch (e) {
      console.error('Error parseando usuario', e);
      this.usuarioCargado = true;
    }
  }

  private gestionarInventario(usuarioId: number) {
    this.inventarioService.getInventarioDetalladoPorUsuario(usuarioId).subscribe({
      next: (data) => {
        console.log('Inventario detectado, no es necesario crear uno nuevo.');
      },
      error: (err) => {
        if (err.status === 404) {
          console.warn('Inventario no encontrado. Creando uno nuevo para el usuario...');
          this.inventarioService.crearInventario(usuarioId).subscribe({
            next: (nuevo) => console.log('Inventario creado exitosamente:', nuevo),
            error: (e) => console.error('Error crítico al crear inventario:', e)
          });
        } else {
          console.error('Error de conexión con el inventario:', err);
        }
      }
    });
  }
}

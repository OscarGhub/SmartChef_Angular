import { Component, inject, OnInit } from '@angular/core';
import { CabeceraComponent } from "../../componentes/cabecera/cabecera.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { IonicModule } from "@ionic/angular";
import { TarjetaInventarioComponent } from "../../componentes/tarjeta-inventario/tarjeta-inventario.component";
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    IonicModule,
    TarjetaInventarioComponent,
    CommonModule
  ]
})
export class InventarioComponent implements OnInit {

  usuario?: Usuario | null;
  usuarioCargado: boolean = false;

  private usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.inicializarUsuario();
  }

  private inicializarUsuario() {
    const data = localStorage.getItem('usuario');
    console.log('Cargando usuario de localStorage:', data);

    if (!data) {
      this.usuarioCargado = true;
      return;
    }

    try {
      this.usuario = JSON.parse(data);
      console.log('Usuario parseado:', this.usuario);
    } catch (e) {
      console.error('Error parseando usuario de localStorage', e);
      this.usuarioCargado = true;
      return;
    }

    const correo = this.usuario?.correoElectronico;
    console.log('Correo del usuario:', correo);

    if (!correo) {
      this.usuarioCargado = true;
      return;
    }

    this.usuarioService.getUsuarioPorCorreo(correo).subscribe({
      next: (u) => {
        console.log('Usuario recibido del backend:', u);
        if (u?.id != null) {
          this.usuario = u;
          this.usuarioCargado = true;
        }
      },
      error: (err) => {
        console.error('Error obteniendo usuario del servidor', err);
        this.usuarioCargado = true;
      }
    });
  }

}

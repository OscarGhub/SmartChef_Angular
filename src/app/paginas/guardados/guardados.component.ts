import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CabeceraComponent } from '../../componentes/cabecera/cabecera.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RecetaService } from '../../servicios/receta.service';
import { UsuarioService } from '../../servicios/usuario.service';
import {
  TarjetaRecetaExtendidaComponent
} from "../../componentes/tarjeta-receta-extendida/tarjeta-receta-extendida.component";
import {TarjetaComponent} from "../../componentes/tarjeta_receta/tarjeta.component";

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrls: ['./guardados.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    CabeceraComponent,
    FooterComponent,
    TarjetaComponent
  ]
})
export class GuardadosComponent implements OnInit {
  recetasGuardadas: any[] = [];
  usuarioActual: any = null;
  cargando: boolean = false;

  private recetaService = inject(RecetaService);
  private usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.cargarRecetasGuardadas();
  }

  ionViewWillEnter() {
    this.cargarRecetasGuardadas();
  }

  cargarRecetasGuardadas() {
    this.cargando = true;
    this.recetasGuardadas = [];

    const correo = localStorage.getItem('correoElectronico');
    if (!correo) {
      console.warn('No hay correo guardado en localStorage.');
      this.cargando = false;
      return;
    }

    console.log('Correo encontrado en localStorage:', correo);

    this.usuarioService.getUsuarioPorCorreo(correo).subscribe({
      next: (usuario) => {
        if (!usuario || usuario.id === undefined) {
          console.warn('Usuario no encontrado o sin ID válido.');
          this.cargando = false;
          return;
        }

        this.usuarioActual = usuario;

        this.recetaService.getRecetasGuardadas(usuario.id).subscribe({
          next: (recetas) => {
            this.recetasGuardadas = recetas;
            this.cargando = false;
          },
          error: (err) => {
            console.error('Error al obtener recetas guardadas:', err);
            this.cargando = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener usuario actual:', err);
        this.cargando = false;
      }
    });
  }

}

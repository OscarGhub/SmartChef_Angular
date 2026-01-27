// tarjeta-coleccion.component.ts

import { Component, Input, inject, OnInit } from '@angular/core'; // <--- Añadir OnInit
// ... (otras importaciones)
import { Coleccion } from "../../modelos/coleccion.model";
import { ColeccionService } from "../../servicios/coleccion.service";
import {FormularioColeccionComponent} from "../formulario-coleccion/formulario-coleccion.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {UsuarioService} from "../../servicios/usuario.service";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
// ... (otras importaciones)

@Component({
  selector: 'app-tarjeta-coleccion',
  templateUrl: 'tarjeta-coleccion.component.html',
  styleUrls: ['./tarjeta-coleccion.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, FormsModule]
})
export class TarjetaColeccionComponent implements OnInit {

  colecciones: Coleccion[] = [];

  cargando: boolean = true;

  nombreColeccion: string = '';
  mostrarModalCrearColeccion: boolean = false;

  private router = inject(Router);
  private coleccionService = inject(ColeccionService);
  private usuarioService = inject(UsuarioService);
  private modalCtrl = inject(ModalController);

  idUsuario: number | null = null;

  constructor() {
    this.idUsuario = this.usuarioService.obtenerUsuarioId();
  }

  ngOnInit() {
    if (!this.idUsuario) {
      console.warn('Advertencia: Usuario no logeado o ID no encontrado.');
      this.cargando = false;
      return;
    }
    this.cargarColecciones();
  }

  cargarColecciones() {
    if (!this.idUsuario) return;

    this.cargando = true;
    this.coleccionService.obtenerColeccionesUsuario(this.idUsuario).subscribe({
      next: (data) => {
        this.colecciones = data;
        this.cargando = false;
        console.log('Colecciones cargadas:', this.colecciones);
      },
      error: (err) => {
        console.error('Error al cargar colecciones', err);
        this.cargando = false;
      }
    });
  }

  goToColeccion(coleccionId: number) {
    if (coleccionId) {
      console.log('Navegando a la colección con ID:', coleccionId);
      this.router.navigate(['/coleccion', coleccionId]);
    } else {
      console.warn('No se encontró ID en la colección.');
    }
  }

  async abrirModalInsertar() {
    if (this.idUsuario === null) {
      console.error('No se puede abrir el modal: ID de usuario no disponible.');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: FormularioColeccionComponent,
      componentProps: {
        idUsuario: this.idUsuario
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.cargarColecciones();
    }
  }
}

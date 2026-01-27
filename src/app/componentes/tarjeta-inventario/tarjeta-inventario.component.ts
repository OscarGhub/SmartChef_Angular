import { Component, OnInit, inject, Input } from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../servicios/inventario.service';
import { IngredienteService } from '../../servicios/ingrediente.service';
import { Ingrediente } from '../../modelos/ingrediente.model';
import { InventarioIngredienteItem } from "../../modelos/inventario-ingrediente.model";
import {FormularioInventarioComponent} from "../formulario-inventario/formulario-inventario.component";

@Component({
  selector: 'app-tarjeta-inventario',
  templateUrl: './tarjeta-inventario.component.html',
  styleUrls: ['./tarjeta-inventario.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,]
})

export class TarjetaInventarioComponent implements OnInit {

  @Input() usuarioId?: number;

  items: InventarioIngredienteItem[] = [];
  ingredientesDisponibles: Ingrediente[] = [];
  private inventarioService = inject(InventarioService);
  private ingredienteService = inject(IngredienteService);
  private modalCtrl = inject(ModalController);

  ngOnInit() {
    if (!this.usuarioId) throw new Error('usuarioId no proporcionado');
    this.cargarInventarioBackend();
    this.cargarIngredientesDisponibles();
  }

  private cargarInventarioBackend() {
    if (!this.usuarioId) return;

    this.inventarioService.getInventarioDetalladoPorUsuario(this.usuarioId).subscribe({
      next: (data) => {
        console.log('Inventario DETALLADO recibido del backend:', data);
        this.items = data;
      },
      error: (err) => {
        console.error('Error obteniendo inventario detallado', err);
        this.items = [];
      }
    });
  }

  private cargarIngredientesDisponibles() {
    this.ingredienteService.getIngredientes().subscribe({
      next: (data) => {
        const idsInventario = new Set(this.items.map(item => item.idIngrediente));
        this.ingredientesDisponibles = data.filter(ingrediente => ingrediente != null && !idsInventario.has(ingrediente.id));

        console.log('Ingredientes disponibles cargados y filtrados:', this.ingredientesDisponibles);
      },
      error: () => {
        this.ingredientesDisponibles = [];
        console.error('Error al cargar ingredientes disponibles');
      }
    });
  }

  async abrirModalInsertar() {
    const idInventarioPrincipal = this.items.length > 0 ? this.items[0].idInventario : null;

    if (!this.usuarioId || !idInventarioPrincipal) {
      console.error('ID de usuario o de inventario no disponible.');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: FormularioInventarioComponent,
      componentProps: {
        usuarioId: this.usuarioId,
        idInventario: idInventarioPrincipal, // Pasar el ID del inventario
        ingredientesDisponibles: this.ingredientesDisponibles // Pasar la lista de ingredientes
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm') {
        console.log('Ingrediente añadido con éxito. Recargando lista...');
        this.cargarInventarioBackend();
      } else if (result.role === 'error') {
        console.warn('Ocurrió un error al intentar añadir el ingrediente.');
      }
    });

    return await modal.present();
  }

}

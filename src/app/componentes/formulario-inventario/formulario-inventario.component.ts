import { Component, Input, inject } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Ingrediente } from '../../modelos/ingrediente.model';
import { InventarioService } from '../../servicios/inventario.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput,
  IonItem, IonLabel,
  IonList, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

interface NuevoInventarioItem {
  idIngrediente: number | null;
  cantidad: number | null;
}

@Component({
  selector: 'app-formulario-inventario',
  templateUrl: './formulario-inventario.component.html',
  styleUrls: ['./formulario-inventario.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonButton,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput
  ]
})
export class FormularioInventarioComponent {

  @Input() usuarioId!: number;
  @Input() idInventario!: number;
  @Input() ingredientesDisponibles: Ingrediente[] = [];

  nuevoItem: NuevoInventarioItem = {
    idIngrediente: null,
    cantidad: null
  };

  private modalCtrl = inject(ModalController);
  private inventarioService = inject(InventarioService);

  constructor() {}

  cancelar() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  guardarIngrediente(form: NgForm) {
    if (form.invalid || !this.nuevoItem.idIngrediente || !this.nuevoItem.cantidad) {
      return;
    }

    if (this.nuevoItem.cantidad <= 0) {
      alert('La cantidad debe ser mayor que cero.');
      return;
    }

    this.inventarioService.agregarIngredienteAlInventario(
      this.idInventario,
      this.nuevoItem.idIngrediente,
      this.nuevoItem.cantidad
    ).subscribe({
      next: (response) => {
        console.log('Ingrediente añadido:', response);
        this.modalCtrl.dismiss(response, 'confirm');
      },
      error: (err) => {
        console.error('Error al añadir ingrediente:', err);
        this.modalCtrl.dismiss(null, 'error');
      }
    });
  }
}

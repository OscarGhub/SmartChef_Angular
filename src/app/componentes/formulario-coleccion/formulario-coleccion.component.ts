import { Component, Input, inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { ColeccionService } from "../../servicios/coleccion.service";
import { ColeccionRequest } from "../../modelos/coleccion.request.model";
import { Coleccion } from "../../modelos/coleccion.model";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-formulario-coleccion',
  templateUrl: './formulario-coleccion.component.html',
  styleUrls: ['./formulario-coleccion.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonLabel,
    IonItem,
    IonInput,
  ]
})
export class FormularioColeccionComponent {

  @Input() idUsuario!: number;

  nombre: string = '';

  private modalCtrl = inject(ModalController);
  private coleccionService = inject(ColeccionService);

  constructor() { }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardarColeccion(form: NgForm) {
    if (form.valid) {
      const coleccionData: ColeccionRequest = {
        nombre: this.nombre,
        idUsuario: this.idUsuario
      };

      this.coleccionService.crearColeccion(coleccionData).subscribe({
        next: (nuevaColeccion: Coleccion) => {
          this.modalCtrl.dismiss(nuevaColeccion, 'confirm');
        },
        error: (err) => {
          console.error('Error al crear colección:', err);
          this.modalCtrl.dismiss(null, 'error');
        }
      });
    }
  }
}

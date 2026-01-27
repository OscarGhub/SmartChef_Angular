import { Component, Input, inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { ColeccionService } from "../../servicios/coleccion.service";
import { ColeccionRequest } from "../../modelos/coleccion.request.model";
import { Coleccion } from "../../modelos/coleccion.model";

@Component({
  selector: 'app-formulario-coleccion',
  templateUrl: './formulario-coleccion.component.html',
  styleUrls: ['./formulario-coleccion.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonicModule
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

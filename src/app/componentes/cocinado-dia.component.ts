import {Component, inject} from '@angular/core';
import { HistorialRecetaService } from '../servicios/historial-receta.service';
import { RecetaUsoRequest } from '../modelos/receta-uso-request.model';
import { RecetaUso } from '../modelos/receta-uso.model';

@Component({
  selector: 'app-receta-dia',
  template: `
    <button (click)="registrarReceta()">He cocinado esta receta hoy</button>
  `
})
export class RecetaDiaComponent {

  private historialService = inject(HistorialRecetaService);

  registrarReceta() {
    const dto: RecetaUsoRequest = {
      idReceta: 5,
      idUsuario: 2,
      fecha: "2025-11-27"
    };

    this.historialService.guardarRecetaDia(dto).subscribe({
      next: (res: RecetaUso) => {
        console.log('Receta registrada:', res.nombreReceta, 'Veces cocinada:', res.vecesCocinada);
      },
      error: (err) => {
        console.error('Error al registrar receta:', err);
      }
    });
  }
}

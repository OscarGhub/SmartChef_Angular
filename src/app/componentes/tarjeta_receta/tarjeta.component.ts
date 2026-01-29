import { Component, Input, inject } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Receta } from '../../modelos/receta.model';
import { CommonModule } from '@angular/common';
import {IonButton, IonCard} from "@ionic/angular/standalone";

@Component({
  selector: 'app-tarjeta-receta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, IonCard, IonButton]
})
export class TarjetaComponent {
  @Input() receta!: Receta;

  private router = inject(Router);

  goToReceta() {
    const id = this.receta.id;

    if (id) {
      console.log('Navegando a:', id);
      this.router.navigate(['/receta', id]);
    } else {
      console.warn('No se encontró ID en receta:', this.receta);
    }
  }

  async onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '../../../assets/images/receta.png';
  }
}

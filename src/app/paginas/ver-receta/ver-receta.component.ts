import { Component, OnInit, inject } from '@angular/core';
import { CabeceraComponent } from "../../componentes/cabecera/cabecera.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { IonicModule } from "@ionic/angular";
import { TarjetaRecetaExtendidaComponent } from "../../componentes/tarjeta-receta-extendida/tarjeta-receta-extendida.component";
import { ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../servicios/receta.service';
import { Receta } from '../../modelos/receta.model';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.scss'],
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    IonicModule,
    TarjetaRecetaExtendidaComponent,
    CommonModule
  ]
})
export class VerRecetaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recetaService = inject(RecetaService);

  receta?: Receta;

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.recetaService.getRecetaById(id).subscribe({
        next: (receta) => {
          this.receta = receta;
        },
        error: (err) => {
          console.error('Error cargando la receta', err);
        }
      });
    }
  }
}

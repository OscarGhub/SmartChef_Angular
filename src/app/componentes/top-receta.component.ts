import { inject, OnInit } from '@angular/core';
import { RecetaService } from '../servicios/receta.service';
import {RecetaMasGuardada} from "../modelos/receta-masguardada.model";

export class TopRecetaComponent implements OnInit {
  private recetaService = inject(RecetaService);
  recetaMasGuardada: RecetaMasGuardada | null = null;

  ngOnInit(): void {
    this.recetaService.getRecetaMasGuardada().subscribe(data => {
      this.recetaMasGuardada = data;
    });
  }
}

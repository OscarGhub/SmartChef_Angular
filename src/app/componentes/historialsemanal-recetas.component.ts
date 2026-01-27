import {inject, OnInit} from "@angular/core";
import {IngredienteService} from "../servicios/ingrediente.service";
import {TopIngrediente} from "../modelos/top-ingrediente.model";
import {HistorialRecetaService} from "../servicios/historial-receta.service";
import {RecetaUso} from "../modelos/receta-uso.model";

export class HistorialsemanalRecetasComponent implements OnInit {
  private historialRecetaService = inject(HistorialRecetaService);
  recetaUso: RecetaUso[] = [];

  ngOnInit(): void {
    this.historialRecetaService.getRecetasUltimaSemana().subscribe(data => {
      this.recetaUso = data;
    });
  }
}

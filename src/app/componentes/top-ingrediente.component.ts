import {inject, OnInit} from "@angular/core";
import {IngredienteService} from "../servicios/ingrediente.service";
import {TopIngrediente} from "../modelos/top-ingrediente.model";

export class TopIngredientesComponent implements OnInit {
  private ingredienteService = inject(IngredienteService);
  topIngredientes: TopIngrediente[] = [];

  ngOnInit(): void {
    this.ingredienteService.getTop5UsedIngredients().subscribe(data => {
      this.topIngredientes = data;
    });
  }
}

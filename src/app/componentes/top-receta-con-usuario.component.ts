import { Component, inject, OnInit } from '@angular/core';
import { RecetaService } from '../servicios/receta.service';
import {RecetaMasGuardadaConUsuarios} from '../modelos/receta-masguardada.model';

@Component({
  selector: 'app-top-receta-con-usuario',
  templateUrl: './top-receta-con-usuario.component.html',
  styleUrls: ['./top-receta-con-usuario.component.css']
})
export class TopRecetaConUsuarioComponent implements OnInit {
  recetaMasGuardadaConUsuarios: RecetaMasGuardadaConUsuarios | null = null;
  private recetaService = inject(RecetaService);

  ngOnInit(): void {
    this.recetaService.getRecetaMasGuardadaPorUsuario().subscribe({
      next: (data) => {
        this.recetaMasGuardadaConUsuarios = {
          ...data,
          usuariosQueGuardaron: data.usuariosQueGuardaron || []
        };
      },
      error: (err) => console.error(err)
    });
  }
}

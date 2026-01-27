import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class UsuarioComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }
}

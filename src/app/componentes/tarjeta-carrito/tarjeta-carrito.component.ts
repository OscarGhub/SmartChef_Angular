import { Component, OnInit, inject, Input } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../servicios/carrito.service';
import { ListaCompraIngrediente } from '../../modelos/carrito.model';
import { firstValueFrom } from "rxjs";
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-tarjeta-carrito',
  templateUrl: './tarjeta-carrito.component.html',
  styleUrls: ['./tarjeta-carrito.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TarjetaCarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  private usuarioService = inject(UsuarioService);

  listaCompraIngredientes: ListaCompraIngrediente[] = [];
  cargando: boolean = false;
  private idUsuario: number | null = null;

  ngOnInit() {
    this.idUsuario = this.usuarioService.obtenerUsuarioId();
    this.cargarLista();
  }

  async cargarLista() {
    if (!this.idUsuario) {
      console.warn('Advertencia: Usuario no logeado o ID de usuario no encontrado. No se cargará la lista.');
      return;
    }

    this.cargando = true;
    try {
      this.listaCompraIngredientes = await firstValueFrom(
        this.carritoService.getIngredientesPorUsuario(this.idUsuario)
      );
    } catch (error) {
      console.error('Error al cargar la lista:', error);
      this.listaCompraIngredientes = [];
    } finally {
      this.cargando = false;
    }
  }

}

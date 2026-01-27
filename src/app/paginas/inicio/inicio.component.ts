import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TarjetaComponent } from '../../componentes/tarjeta_receta/tarjeta.component';
import { CabeceraComponent } from '../../componentes/cabecera/cabecera.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { SearchBarComponent } from '../../componentes/search-bar/search-bar.component';
import { RecetaService } from '../../servicios/receta.service';
import { Receta } from '../../modelos/receta.model';
import { CommonModule } from '@angular/common';
import { Preferencia } from "../../modelos/preferencia.model";
import { PreferenciaService } from '../../servicios/preferencia.service';
import { InventarioService } from '../../servicios/inventario.service';
import { InventarioItem } from '../../modelos/inventario.model';
import { UsuarioService } from '../../servicios/usuario.service';
import { ModalController } from '@ionic/angular';
import { FormularioRecetaComponent } from '../../componentes/formulario-receta/formulario-receta.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    TarjetaComponent,
    CabeceraComponent,
    FooterComponent,
    SearchBarComponent,
    CommonModule,
  ]
})
export class InicioComponent implements OnInit {
  private recetaService = inject(RecetaService);
  private preferenciaService = inject(PreferenciaService);
  private inventarioService = inject(InventarioService);
  private usuarioService = inject(UsuarioService);
  private modalCtrl = inject(ModalController);

  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  preferencias: Preferencia[] = [];
  preferenciasSeleccionadas: number[] = [];
  textoBusqueda: string = '';

  inventario?: InventarioItem;
  usuarioId: number | null = null;

  ngOnInit() {
    const usuario = this.usuarioService.obtenerUsuario();
    this.usuarioId = usuario?.id ?? null;

    if (this.usuarioId) {
      this.cargarInventarioInicial(this.usuarioId);
    }

    this.cargarRecetas();
    this.cargarPreferencias();
  }

  private cargarInventarioInicial(usuarioId: number) {
    this.inventarioService.getInventarioPorUsuario(usuarioId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.inventario = data[0];
          console.log('Inventario cargado:', this.inventario);
          this.cargarIngredientes(this.inventario.id);
        } else {
          console.log('No se encontró inventario. Creando uno nuevo.');
          this.crearInventario(usuarioId);
        }
      },
      error: (err) => console.error('Error al cargar inventario inicial', err)
    });
  }

  private crearInventario(usuarioId: number) {
    this.inventarioService.crearInventario(usuarioId).subscribe({
      next: (nuevoInventario) => {
        this.inventario = nuevoInventario;
        console.log('Inventario creado automáticamente', nuevoInventario);
      },
      error: (err) => console.error('Error al crear inventario', err)
    });
  }

  private cargarRecetas() {
    this.recetaService.getRecetas().subscribe({
      next: (data) => {
        this.recetas = data;
        this.recetasFiltradas = data;
      },
      error: (err) => console.error('Error al cargar recetas', err)
    });
  }

  private cargarPreferencias() {
    this.preferenciaService.getPreferencias().subscribe({
      next: (data) => this.preferencias = data,
      error: (err) => console.error('Error al cargar preferencias', err)
    });
  }

  onSearch(text: string) {
    this.textoBusqueda = text.toLowerCase();
    this.aplicarFiltros();
  }

  filtrar(preferenciaIds: number[]): void {
    this.preferenciasSeleccionadas = preferenciaIds;

    this.recetaService.filtrarPorPreferencias(preferenciaIds).subscribe({
      next: (data) => {
        this.recetasFiltradas = data;
        this.aplicarFiltros();
      },
      error: (err) => console.error('Error al filtrar recetas', err)
    });
  }

  private aplicarFiltros(): void {
    this.recetasFiltradas = this.recetas.filter(r => {
      const coincidePreferencia =
        this.preferenciasSeleccionadas.length === 0 ||
        r.preferencias.some(p => p.id !== undefined && this.preferenciasSeleccionadas.includes(p.id));

      const coincideTexto =
        r.titulo.toLowerCase().includes(this.textoBusqueda) ||
        r.descripcion.toLowerCase().includes(this.textoBusqueda);

      return coincidePreferencia && coincideTexto;
    });
  }

  private cargarIngredientes(inventarioId: number) {
    console.log(`Inventario ${inventarioId} existe. Si es necesario, cargar ingredientes detallados aquí.`);
  }

  async abrirModalInsertar() {
    const modal = await this.modalCtrl.create({
      component: FormularioRecetaComponent,
      componentProps: { usuarioId: this.usuarioId }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'creado' && data) {
      this.recetas.push(data);
      this.aplicarFiltros();
    }
  }

}

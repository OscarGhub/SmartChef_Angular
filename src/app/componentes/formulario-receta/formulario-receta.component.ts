import {Component, inject, Input, OnInit} from "@angular/core";
import {IonicModule, ModalController} from "@ionic/angular";
import {FormsModule, NgForm} from "@angular/forms";
import {RecetaService} from "../../servicios/receta.service";
import {Receta} from "../../modelos/receta.model";
import {firstValueFrom} from "rxjs";

interface NuevaRecetaForm {
  titulo: string;
  descripcion: string;
  tiempoPreparacion: number | null;
  img: string;
  pasos: string;
}

@Component({
  selector: 'app-formulario-receta',
  templateUrl: './formulario-receta.component.html',
  styleUrls: ['./formulario-receta.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class FormularioRecetaComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private recetaService = inject(RecetaService);

  @Input() usuarioId: number | null = null;
  @Input() recetaAEditar?: Receta;

  nuevaReceta: NuevaRecetaForm = {
    titulo: '',
    descripcion: '',
    tiempoPreparacion: null,
    img: '',
    pasos: ''
  };

  esEdicion: boolean = false;

  ngOnInit() {
    if (this.recetaAEditar) {
      this.esEdicion = true;
      this.nuevaReceta = {
        titulo: this.recetaAEditar.titulo,
        descripcion: this.recetaAEditar.descripcion,
        tiempoPreparacion: this.recetaAEditar.tiempoPreparacion,
        img: this.recetaAEditar.fotoUrl || '',
        pasos: this.recetaAEditar.tutorial || ''
      };
    }
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardarReceta(form: NgForm) {
    if (form.invalid) {
      console.error('Formulario inválido.');
      return;
    }

    const recetaRequest = {
      titulo: this.nuevaReceta.titulo,
      descripcion: this.nuevaReceta.descripcion,
      tutorial: this.nuevaReceta.pasos,
      tiempoPreparacion: this.nuevaReceta.tiempoPreparacion,
      fotoUrl: this.nuevaReceta.img,
    };

    try {
      let recetaGuardada: Receta;

      if (this.esEdicion) {
        if (!this.recetaAEditar!.id) {
          throw new Error("ID de receta faltante para la edición.");
        }
        recetaGuardada = await firstValueFrom(
          this.recetaService.actualizarReceta(this.recetaAEditar!.id, recetaRequest)
        );
      } else {
        if (!this.usuarioId) {
          console.error('ID de usuario faltante para la creación.');
          return;
        }
        recetaGuardada = await firstValueFrom(
          this.recetaService.crearReceta(recetaRequest)
        );
      }

      console.log('Receta guardada/editada:', recetaGuardada);
      this.modalCtrl.dismiss(recetaGuardada, 'confirm');

    } catch (err) {
      console.error('Error al guardar la receta:', err);
    }
  }
}

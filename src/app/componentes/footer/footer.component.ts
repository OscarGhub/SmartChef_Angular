import { Component, inject, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class FooterComponent {

  private router = inject(Router);

  @Output() recargarGuardados = new EventEmitter<void>();

  goToExplorar() {
    this.router.navigate(['/inicio']);
  }

  goToGuardar() {
    this.recargarGuardados.emit();
    this.router.navigate(['/guardados']);
  }

  goToCarrito() {
    this.router.navigate(['/carrito']);
  }

  goToColeccion() {
    this.router.navigate(['/coleccion']);
  }
}

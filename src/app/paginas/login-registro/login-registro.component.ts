import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import {IonButton, IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent
  ]
})
export class LoginRegistroComponent  {

  private router = inject(Router);

  constructor() { }



  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

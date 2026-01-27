import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class LoginRegistroComponent implements OnInit {

  private router = inject(Router);

  constructor() { }

  ngOnInit() {}

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

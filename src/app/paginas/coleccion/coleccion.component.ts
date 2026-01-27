import { Component, OnInit } from '@angular/core';
import {CabeceraComponent} from "../../componentes/cabecera/cabecera.component";
import {FooterComponent} from "../../componentes/footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {TarjetaCarritoComponent} from "../../componentes/tarjeta-carrito/tarjeta-carrito.component";
import {TarjetaColeccionComponent} from "../../componentes/tarjeta-coleccion/tarjeta-coleccion.component";

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.scss'],
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    IonicModule,
    TarjetaColeccionComponent
  ]
})
export class ColeccionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

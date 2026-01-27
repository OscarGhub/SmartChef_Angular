import { Component } from '@angular/core';
import {CabeceraComponent} from "../../componentes/cabecera/cabecera.component";
import {FooterComponent} from "../../componentes/footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {TarjetaComponent} from "../../componentes/tarjeta_receta/tarjeta.component";
import {TarjetaCarritoComponent} from "../../componentes/tarjeta-carrito/tarjeta-carrito.component";

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.scss'],
    standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    IonicModule,
    TarjetaCarritoComponent
  ]
})
export class CarritoComponent   {

  constructor() { }



}

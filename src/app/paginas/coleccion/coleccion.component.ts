import { Component } from '@angular/core';
import {CabeceraComponent} from "../../componentes/cabecera/cabecera.component";
import {FooterComponent} from "../../componentes/footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {TarjetaCarritoComponent} from "../../componentes/tarjeta-carrito/tarjeta-carrito.component";
import {TarjetaColeccionComponent} from "../../componentes/tarjeta-coleccion/tarjeta-coleccion.component";
import {IonContent, IonFooter, IonHeader} from "@ionic/angular/standalone";

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.scss'],
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    TarjetaColeccionComponent,
    IonContent,
    IonFooter,
    IonHeader
  ]
})
export class ColeccionComponent   {

  constructor() { }



}

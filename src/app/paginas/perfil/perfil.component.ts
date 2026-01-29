import { Component } from '@angular/core';
import {CabeceraComponent} from "../../componentes/cabecera/cabecera.component";
import {FooterComponent} from "../../componentes/footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {SearchBarComponent} from "../../componentes/search-bar/search-bar.component";
import {TarjetaComponent} from "../../componentes/tarjeta_receta/tarjeta.component";
import {TarjetaPerfilComponent} from "../../componentes/tarjeta-perfil/tarjeta-perfil.component";
import {IonContent, IonFooter, IonHeader, IonToolbar} from "@ionic/angular/standalone";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    TarjetaPerfilComponent,
    IonContent,
    IonToolbar,
    IonHeader,
    IonFooter,
  ]
})
export class PerfilComponent   {

  constructor() { }



}

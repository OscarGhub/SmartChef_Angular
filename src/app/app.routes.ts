import { Routes } from '@angular/router';
import {InicioComponent} from "./paginas/inicio/inicio.component";
import {PerfilComponent} from "./paginas/perfil/perfil.component";
import {GuardadosComponent} from "./paginas/guardados/guardados.component";
import {CarritoComponent} from "./paginas/carrito/carrito.component";
import {VerRecetaComponent} from "./paginas/ver-receta/ver-receta.component";
import {LoginComponent} from "./paginas/login/login.component";
import {LoginRegistroComponent} from "./paginas/login-registro/login-registro.component";
import {RegistroComponent} from "./paginas/registro/registro.component";
import {InventarioComponent} from "./paginas/inventario/inventario.component";
import {ColeccionComponent} from "./paginas/coleccion/coleccion.component";

export const routes: Routes = [

  {path: '', redirectTo: 'registro_login', pathMatch: 'full'},

  {path: 'registro_login', component: LoginRegistroComponent},

  {path: 'registro', component: RegistroComponent},

  {path: 'login', component: LoginComponent},

  {path: 'inicio', component: InicioComponent},

  {path: 'perfil', component: PerfilComponent},

  {path: 'guardados', component: GuardadosComponent},

  {path: 'carrito', component: CarritoComponent},

  { path: 'receta/:id', component: VerRecetaComponent },

  {path: 'inventario', component: InventarioComponent},

  {path: 'coleccion', component: ColeccionComponent},

];

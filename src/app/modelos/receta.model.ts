import {Preferencia} from "./preferencia.model";

export interface Receta {
  id?: number;
  titulo: string;
  descripcion: string;
  tutorial: string;
  tiempoPreparacion: number;
  fotoUrl: string;
  numFavoritos: number;
  preferencias: Preferencia[];
  yaGuardada?: boolean;
  enCarrito?: boolean;
}

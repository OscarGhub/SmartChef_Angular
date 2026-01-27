import {Usuario} from "./usuario.model";

export interface RecetaMasGuardada {
  id: number;
  titulo: string;
  descripcion: string;
  tutorial: string;
  tiempoPreparacion: number;
  fotoUrl: string;
  numFavoritos: number;
  guardada: boolean;
}

export interface RecetaMasGuardadaConUsuarios {
  id: number;
  titulo: string;
  descripcion: string;
  tutorial: string;
  tiempoPreparacion: number;
  fotoUrl: string;
  numFavoritos: number;
  guardada: boolean;
  usuariosQueGuardaron: Usuario[];
}

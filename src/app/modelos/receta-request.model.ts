export interface RecetaRequest {
  titulo: string;
  descripcion: string;
  tutorial: string;
  tiempoPreparacion: number | null;
  fotoUrl: string | null;
}

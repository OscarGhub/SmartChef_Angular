export interface InventarioItem {
  id: number;
  idUsuario: number;
  idIngrediente?: number;
  descripcion?: string;
  unidadMedida?: string;
  cantidad?: number;
  fecha_creacion?: string;
  imagenUrl?: string;
}

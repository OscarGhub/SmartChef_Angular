export interface Ingrediente {
  id: number;
  nombre: string;
  descripcion?: string;
  cantidad?: number;
  unidadMedida?: string;
  imagenUrl?: string;
}

export interface ListaCompraIngrediente {
  recetaId: number | undefined;
  idLista: number;
  ingrediente: Ingrediente;
  cantidad: number;
  receta?: {
    id: number;
    nombre: string;
  };
}

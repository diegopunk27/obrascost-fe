export interface Rubro {
  id: number;
  nombre: string;
  descripcion: string;
  costo_referencia_m2: number;
  activo: boolean;
}

export interface RubroCreate {
  nombre: string;
  descripcion?: string;
  costo_referencia_m2: number;
}

export interface RubroUpdate extends Partial<RubroCreate> {
  activo?: boolean;
}

export interface Obra {
  id: number;
  usuario_id: number;
  nombre: string;
  direccion: string;
  provincia_id: number | null;
  superficie_m2: number;
  fecha_inicio: string;
  fecha_fin_estimada: string | null;
  estado: EstadoObra;
  presupuesto_inicial: number | null;
}

export type EstadoObra = 'borrador' | 'en_progreso' | 'pausada' | 'finalizada' | 'cancelada';

export interface ObraCreate {
  nombre: string;
  direccion?: string;
  provincia_id?: number | null;
  superficie_m2: number;
  fecha_inicio: string;
  fecha_fin_estimada?: string | null;
  estado?: EstadoObra;
  presupuesto_inicial?: number | null;
}

export interface ObraUpdate extends Partial<ObraCreate> {}

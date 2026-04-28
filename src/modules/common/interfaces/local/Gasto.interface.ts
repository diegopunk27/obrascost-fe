export interface Gasto {
  id: number;
  obra_id: number;
  rubro_id: number | null;
  descripcion: string;
  monto: number;
  fecha: string;
  comprobante_url: string | null;
}

export interface GastoCreate {
  rubro_id?: number | null;
  descripcion: string;
  monto: number;
  fecha: string;
  comprobante_url?: string | null;
}

export interface GastoUpdate extends Partial<GastoCreate> {}

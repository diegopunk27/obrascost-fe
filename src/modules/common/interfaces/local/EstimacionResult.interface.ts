export interface EstimacionResult {
  total_estimado: number;
  desglose_por_rubro: Record<string, number>;
  margen_error_pct: number;
  fuente: string;
  sugerencia_ia: string | null;
  ajuste_recomendado_pct: number | null;
  alertas: Array<string>;
}

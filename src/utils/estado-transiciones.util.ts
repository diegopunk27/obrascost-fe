import type { EstadoObra } from '@common-interfaces/Obra.interface';

/**
 * Espejo de TRANSICIONES_VALIDAS del backend.
 * Fuente de verdad: src/modules/obras/schemas.py del BE.
 * El BE valida — esta tabla solo evita mostrar opciones imposibles en la UI.
 */
export const TRANSICIONES: Record<EstadoObra, Array<EstadoObra>> = {
  borrador: ['en_progreso', 'cancelada'],
  en_progreso: ['pausada', 'finalizada', 'cancelada'],
  pausada: ['en_progreso', 'cancelada'],
  finalizada: [],
  cancelada: [],
};

export const getTransicionesValidas = (actual: EstadoObra): Array<EstadoObra> =>
  TRANSICIONES[actual];

export const esEstadoTerminal = (estado: EstadoObra): boolean => TRANSICIONES[estado].length === 0;

export const ESTADO_LABELS: Record<EstadoObra, string> = {
  borrador: 'Borrador',
  en_progreso: 'En progreso',
  pausada: 'Pausada',
  finalizada: 'Finalizada',
  cancelada: 'Cancelada',
};

import { describe, expect, it } from 'vitest';
import {
  ESTADO_LABELS,
  TRANSICIONES,
  esEstadoTerminal,
  getTransicionesValidas,
} from '@utils/estado-transiciones.util';

describe('estadoTransiciones', () => {
  it('borrador permite ir a en_progreso o cancelada', () => {
    expect(getTransicionesValidas('borrador')).toEqual(['en_progreso', 'cancelada']);
  });

  it('en_progreso permite pausar, finalizar o cancelar', () => {
    expect(getTransicionesValidas('en_progreso')).toEqual([
      'pausada',
      'finalizada',
      'cancelada',
    ]);
  });

  it('pausada permite volver a en_progreso o cancelar', () => {
    expect(getTransicionesValidas('pausada')).toEqual(['en_progreso', 'cancelada']);
  });

  it('finalizada y cancelada son terminales (sin transiciones)', () => {
    expect(getTransicionesValidas('finalizada')).toEqual([]);
    expect(getTransicionesValidas('cancelada')).toEqual([]);
    expect(esEstadoTerminal('finalizada')).toBe(true);
    expect(esEstadoTerminal('cancelada')).toBe(true);
  });

  it('los estados no terminales NO son detectados como terminales', () => {
    expect(esEstadoTerminal('borrador')).toBe(false);
    expect(esEstadoTerminal('en_progreso')).toBe(false);
    expect(esEstadoTerminal('pausada')).toBe(false);
  });

  it('TRANSICIONES contiene todos los estados conocidos', () => {
    expect(Object.keys(TRANSICIONES).sort()).toEqual([
      'borrador',
      'cancelada',
      'en_progreso',
      'finalizada',
      'pausada',
    ]);
  });

  it('ESTADO_LABELS tiene un label para cada estado', () => {
    expect(Object.keys(ESTADO_LABELS).sort()).toEqual([
      'borrador',
      'cancelada',
      'en_progreso',
      'finalizada',
      'pausada',
    ]);
  });
});

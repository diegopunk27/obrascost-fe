import { act, renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Obras.service', () => ({
  obrasService: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    get: vi.fn(),
    estimar: vi.fn(),
  },
  ObrasService: vi.fn(),
}));

import { obrasService } from '@common-services/Obras.service';
import type { Obra } from '@common-interfaces/Obra.interface';
import { useObra } from '../useObra';

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(SWRConfig, { value: { dedupingInterval: 0, provider: () => new Map() } }, children);

const mockObra = (): Obra => ({
  id: 10,
  usuario_id: 1,
  nombre: 'Mi Obra',
  direccion: 'Calle 1',
  provincia_id: 1,
  superficie_m2: 200,
  fecha_inicio: '2025-01-01',
  fecha_fin_estimada: null,
  estado: 'en_progreso',
  presupuesto_inicial: 500000,
});

const mockEstimacion = {
  total_estimado: 6_000_000,
  desglose_por_rubro: { Estructura: 2_000_000, Pintura: 500_000 },
  margen_error_pct: 15,
  fuente: 'heuristica' as const,
  alertas: [],
};

describe('useObra', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna la obra cuando id es válido', async () => {
    vi.mocked(obrasService.get).mockResolvedValue(mockObra());

    const { result } = renderHook(() => useObra(10), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.obra?.nombre).toBe('Mi Obra');
  });

  it('no realiza fetch cuando id es null', () => {
    const { result } = renderHook(() => useObra(null), { wrapper });

    expect(obrasService.get).not.toHaveBeenCalled();
    expect(result.current.obra).toBeUndefined();
  });

  it('estimacion es null inicialmente', async () => {
    vi.mocked(obrasService.get).mockResolvedValue(mockObra());

    const { result } = renderHook(() => useObra(10), { wrapper });

    expect(result.current.estimacion).toBeNull();
  });

  it('estimar llama al servicio y guarda resultado', async () => {
    vi.mocked(obrasService.get).mockResolvedValue(mockObra());
    vi.mocked(obrasService.estimar).mockResolvedValue(mockEstimacion);

    const { result } = renderHook(() => useObra(10), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.estimar(false);
    });

    expect(obrasService.estimar).toHaveBeenCalledWith(10, false);
    expect(result.current.estimacion?.total_estimado).toBe(6_000_000);
  });

  it('estimar con IA llama al servicio con conIa=true', async () => {
    vi.mocked(obrasService.get).mockResolvedValue(mockObra());
    vi.mocked(obrasService.estimar).mockResolvedValue(mockEstimacion);

    const { result } = renderHook(() => useObra(10), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.estimar(true);
    });

    expect(obrasService.estimar).toHaveBeenCalledWith(10, true);
  });

  it('estimando es false antes y después de estimar', async () => {
    vi.mocked(obrasService.get).mockResolvedValue(mockObra());
    vi.mocked(obrasService.estimar).mockResolvedValue(mockEstimacion);

    const { result } = renderHook(() => useObra(10), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.estimando).toBe(false);

    await act(async () => {
      await result.current.estimar(false);
    });

    expect(result.current.estimando).toBe(false);
  });
});

import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Gastos.service', () => ({
  gastosService: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
  GastosService: vi.fn(),
}));

import { gastosService } from '@common-services/Gastos.service';
import type { Gasto } from '@common-interfaces/Gasto.interface';
import { useGastos } from '../useGastos';

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(SWRConfig, { value: { dedupingInterval: 0, provider: () => new Map() } }, children);

const mockGasto = (id: number, monto: number): Gasto => ({
  id,
  obra_id: 5,
  rubro_id: null,
  descripcion: `Gasto ${id}`,
  monto,
  fecha: '2025-04-01',
  comprobante_url: null,
});

describe('useGastos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna gastos de la obra cuando carga', async () => {
    vi.mocked(gastosService.list).mockResolvedValue([mockGasto(1, 1000), mockGasto(2, 2000)]);

    const { result } = renderHook(() => useGastos(5), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.gastos).toHaveLength(2);
  });

  it('gastos es array vacío mientras carga', () => {
    vi.mocked(gastosService.list).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useGastos(5), { wrapper });

    expect(result.current.gastos).toEqual([]);
  });

  it('no realiza fetch cuando obraId es null', () => {
    renderHook(() => useGastos(null), { wrapper });
    expect(gastosService.list).not.toHaveBeenCalled();
  });

  it('total suma los montos de todos los gastos', async () => {
    vi.mocked(gastosService.list).mockResolvedValue([mockGasto(1, 1000), mockGasto(2, 2500)]);

    const { result } = renderHook(() => useGastos(5), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.total).toBe(3500);
  });

  it('total es 0 cuando no hay gastos', async () => {
    vi.mocked(gastosService.list).mockResolvedValue([]);

    const { result } = renderHook(() => useGastos(5), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.total).toBe(0);
  });

  it('create llama al servicio con obraId y body', async () => {
    vi.mocked(gastosService.list).mockResolvedValue([]);
    vi.mocked(gastosService.create).mockResolvedValue(mockGasto(99, 500));

    const { result } = renderHook(() => useGastos(5), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const body = { descripcion: 'Cemento', monto: 500, fecha: '2025-04-01' };
    await result.current.create(body);

    expect(gastosService.create).toHaveBeenCalledWith(5, body);
  });

  it('remove llama al servicio con obraId y gastoId', async () => {
    vi.mocked(gastosService.list).mockResolvedValue([mockGasto(10, 800)]);
    vi.mocked(gastosService.remove).mockResolvedValue(undefined);

    const { result } = renderHook(() => useGastos(5), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.remove(10);

    expect(gastosService.remove).toHaveBeenCalledWith(5, 10);
  });
});

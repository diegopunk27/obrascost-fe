import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Rubros.service', () => ({
  rubrosService: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
  RubrosService: vi.fn(),
}));

import { rubrosService } from '@common-services/Rubros.service';
import type { Rubro } from '@common-interfaces/Rubro.interface';
import { useRubros } from '../useRubros';

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(SWRConfig, { value: { dedupingInterval: 0, provider: () => new Map() } }, children);

const mockRubro = (id: number, activo = true): Rubro => ({
  id,
  nombre: `Rubro ${id}`,
  descripcion: 'Descripción',
  costo_referencia_m2: 10000 * id,
  activo,
});

describe('useRubros', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna rubros activos cuando carga', async () => {
    vi.mocked(rubrosService.list).mockResolvedValue([mockRubro(1), mockRubro(2)]);

    const { result } = renderHook(() => useRubros(true), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.rubros).toHaveLength(2);
  });

  it('rubros es array vacío mientras carga', () => {
    vi.mocked(rubrosService.list).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useRubros(), { wrapper });

    expect(result.current.rubros).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('llama al servicio con soloActivos=false cuando se indica', async () => {
    vi.mocked(rubrosService.list).mockResolvedValue([mockRubro(1), mockRubro(2, false)]);

    const { result } = renderHook(() => useRubros(false), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(rubrosService.list).toHaveBeenCalledWith(false);
  });

  it('create llama al servicio y dispara revalidación', async () => {
    vi.mocked(rubrosService.list).mockResolvedValue([]);
    vi.mocked(rubrosService.create).mockResolvedValue(mockRubro(99));

    const { result } = renderHook(() => useRubros(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.create({ nombre: 'Nuevo', costo_referencia_m2: 5000 });

    expect(rubrosService.create).toHaveBeenCalledOnce();
    expect(rubrosService.list).toHaveBeenCalledTimes(2);
  });

  it('update llama al servicio con id y body', async () => {
    vi.mocked(rubrosService.list).mockResolvedValue([mockRubro(3)]);
    vi.mocked(rubrosService.update).mockResolvedValue(mockRubro(3));

    const { result } = renderHook(() => useRubros(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.update(3, { activo: false });

    expect(rubrosService.update).toHaveBeenCalledWith(3, { activo: false });
  });

  it('remove llama al servicio con el id del rubro', async () => {
    vi.mocked(rubrosService.list).mockResolvedValue([mockRubro(5)]);
    vi.mocked(rubrosService.remove).mockResolvedValue(undefined);

    const { result } = renderHook(() => useRubros(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.remove(5);

    expect(rubrosService.remove).toHaveBeenCalledWith(5);
  });
});

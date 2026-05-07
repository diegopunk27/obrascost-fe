import { renderHook, waitFor } from '@testing-library/react';
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
import { useObras } from '../useObras';

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(SWRConfig, { value: { dedupingInterval: 0, provider: () => new Map() } }, children);

const mockObra = (id: number): Obra => ({
  id,
  usuario_id: 1,
  nombre: `Obra ${id}`,
  direccion: '',
  provincia_id: null,
  superficie_m2: 100,
  fecha_inicio: '2025-01-01',
  fecha_fin_estimada: null,
  estado: 'borrador',
  presupuesto_inicial: null,
});

describe('useObras', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna obras cuando se carga la data', async () => {
    vi.mocked(obrasService.list).mockResolvedValue([mockObra(1), mockObra(2)]);

    const { result } = renderHook(() => useObras(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.obras).toHaveLength(2);
    expect(result.current.obras[0].id).toBe(1);
  });

  it('obras es array vacío mientras carga', () => {
    vi.mocked(obrasService.list).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useObras(), { wrapper });

    expect(result.current.obras).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('error queda definido si el servicio falla', async () => {
    vi.mocked(obrasService.list).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useObras(), { wrapper });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });

  it('create llama al servicio y dispara revalidación', async () => {
    vi.mocked(obrasService.list).mockResolvedValue([]);
    vi.mocked(obrasService.create).mockResolvedValue(mockObra(99));

    const { result } = renderHook(() => useObras(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.create({ nombre: 'Nueva', superficie_m2: 100, fecha_inicio: '2025-01-01' });

    expect(obrasService.create).toHaveBeenCalledOnce();
    expect(obrasService.list).toHaveBeenCalledTimes(2);
  });

  it('remove llama al servicio con el id correcto', async () => {
    vi.mocked(obrasService.list).mockResolvedValue([mockObra(1)]);
    vi.mocked(obrasService.remove).mockResolvedValue(undefined);

    const { result } = renderHook(() => useObras(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.remove(1);

    expect(obrasService.remove).toHaveBeenCalledWith(1);
  });

  it('update llama al servicio con id y body correctos', async () => {
    vi.mocked(obrasService.list).mockResolvedValue([mockObra(5)]);
    vi.mocked(obrasService.update).mockResolvedValue(mockObra(5));

    const { result } = renderHook(() => useObras(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.update(5, { nombre: 'Actualizada' });

    expect(obrasService.update).toHaveBeenCalledWith(5, { nombre: 'Actualizada' });
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Services', () => ({
  getData: vi.fn(),
  postData: vi.fn(),
  patchData: vi.fn(),
  deleteData: vi.fn(),
}));

import * as Services from '@common-services/Services';
import { GastosService } from '@common-services/Gastos.service';
import type { Gasto } from '@common-interfaces/Gasto.interface';

const mockGasto = (): Gasto => ({
  id: 1,
  obra_id: 5,
  rubro_id: null,
  descripcion: 'Cemento',
  monto: 15000,
  fecha: '2025-03-01',
  comprobante_url: null,
});

describe('GastosService', () => {
  let service: GastosService;

  beforeEach(() => {
    service = new GastosService();
    vi.clearAllMocks();
  });

  it('list llama a getData /obras/:obraId/gastos', async () => {
    vi.mocked(Services.getData).mockResolvedValue([mockGasto()]);
    const result = await service.list(5);
    expect(Services.getData).toHaveBeenCalledWith('/obras/5/gastos');
    expect(result).toHaveLength(1);
  });

  it('create llama a postData /obras/:obraId/gastos', async () => {
    vi.mocked(Services.postData).mockResolvedValue(mockGasto());
    const body = { descripcion: 'Ladrillos', monto: 8000, fecha: '2025-04-01' };
    await service.create(5, body);
    expect(Services.postData).toHaveBeenCalledWith('/obras/5/gastos', body);
  });

  it('update llama a patchData /obras/:obraId/gastos/:gastoId', async () => {
    vi.mocked(Services.patchData).mockResolvedValue(mockGasto());
    const body = { monto: 20000 };
    await service.update(5, 10, body);
    expect(Services.patchData).toHaveBeenCalledWith('/obras/5/gastos/10', body);
  });

  it('remove llama a deleteData /obras/:obraId/gastos/:gastoId', async () => {
    vi.mocked(Services.deleteData).mockResolvedValue(undefined);
    await service.remove(5, 10);
    expect(Services.deleteData).toHaveBeenCalledWith('/obras/5/gastos/10');
  });
});

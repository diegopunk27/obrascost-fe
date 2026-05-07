import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Services', () => ({
  getData: vi.fn(),
  postData: vi.fn(),
  patchData: vi.fn(),
  deleteData: vi.fn(),
}));

import * as Services from '@common-services/Services';
import { RubrosService } from '@common-services/Rubros.service';
import type { Rubro } from '@common-interfaces/Rubro.interface';

const mockRubro = (): Rubro => ({
  id: 1,
  nombre: 'Estructura',
  descripcion: 'Estructura de hormigón',
  costo_referencia_m2: 35000,
  activo: true,
});

describe('RubrosService', () => {
  let service: RubrosService;

  beforeEach(() => {
    service = new RubrosService();
    vi.clearAllMocks();
  });

  it('list con soloActivos=true llama getData con solo_activos=true', async () => {
    vi.mocked(Services.getData).mockResolvedValue([mockRubro()]);
    await service.list(true);
    expect(Services.getData).toHaveBeenCalledWith('/rubros?solo_activos=true');
  });

  it('list con soloActivos=false llama getData con solo_activos=false', async () => {
    vi.mocked(Services.getData).mockResolvedValue([mockRubro()]);
    await service.list(false);
    expect(Services.getData).toHaveBeenCalledWith('/rubros?solo_activos=false');
  });

  it('list sin argumento usa soloActivos=true por defecto', async () => {
    vi.mocked(Services.getData).mockResolvedValue([]);
    await service.list();
    expect(Services.getData).toHaveBeenCalledWith('/rubros?solo_activos=true');
  });

  it('create llama a postData /rubros', async () => {
    vi.mocked(Services.postData).mockResolvedValue(mockRubro());
    const body = { nombre: 'Pintura', costo_referencia_m2: 8000 };
    await service.create(body);
    expect(Services.postData).toHaveBeenCalledWith('/rubros', body);
  });

  it('update llama a patchData /rubros/:id', async () => {
    vi.mocked(Services.patchData).mockResolvedValue(mockRubro());
    const body = { activo: false };
    await service.update(3, body);
    expect(Services.patchData).toHaveBeenCalledWith('/rubros/3', body);
  });

  it('remove llama a deleteData /rubros/:id', async () => {
    vi.mocked(Services.deleteData).mockResolvedValue(undefined);
    await service.remove(3);
    expect(Services.deleteData).toHaveBeenCalledWith('/rubros/3');
  });
});

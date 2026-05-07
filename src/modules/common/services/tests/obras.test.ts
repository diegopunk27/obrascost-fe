import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@common-services/Services', () => ({
  getData: vi.fn(),
  postData: vi.fn(),
  patchData: vi.fn(),
  deleteData: vi.fn(),
}));

import * as Services from '@common-services/Services';
import { ObrasService } from '@common-services/Obras.service';
import type { Obra } from '@common-interfaces/Obra.interface';

const mockObra = (): Obra => ({
  id: 1,
  usuario_id: 1,
  nombre: 'Casa Test',
  direccion: '',
  provincia_id: null,
  superficie_m2: 100,
  fecha_inicio: '2025-01-01',
  fecha_fin_estimada: null,
  estado: 'borrador',
  presupuesto_inicial: null,
});

describe('ObrasService', () => {
  let service: ObrasService;

  beforeEach(() => {
    service = new ObrasService();
    vi.clearAllMocks();
  });

  it('list llama a getData /obras', async () => {
    vi.mocked(Services.getData).mockResolvedValue([mockObra()]);
    const result = await service.list();
    expect(Services.getData).toHaveBeenCalledWith('/obras');
    expect(result).toHaveLength(1);
  });

  it('get llama a getData /obras/:id', async () => {
    vi.mocked(Services.getData).mockResolvedValue(mockObra());
    await service.get(5);
    expect(Services.getData).toHaveBeenCalledWith('/obras/5');
  });

  it('create llama a postData /obras', async () => {
    vi.mocked(Services.postData).mockResolvedValue(mockObra());
    const body = { nombre: 'Nueva', superficie_m2: 80, fecha_inicio: '2025-06-01' };
    await service.create(body);
    expect(Services.postData).toHaveBeenCalledWith('/obras', body);
  });

  it('update llama a patchData /obras/:id', async () => {
    vi.mocked(Services.patchData).mockResolvedValue(mockObra());
    const body = { nombre: 'Actualizada' };
    await service.update(3, body);
    expect(Services.patchData).toHaveBeenCalledWith('/obras/3', body);
  });

  it('remove llama a deleteData /obras/:id', async () => {
    vi.mocked(Services.deleteData).mockResolvedValue(undefined);
    await service.remove(7);
    expect(Services.deleteData).toHaveBeenCalledWith('/obras/7');
  });

  it('estimar sin IA llama a postData con con_ia=false', async () => {
    const estimacion = { total_estimado: 1000, desglose_por_rubro: {}, margen_error_pct: 15, fuente: 'heuristica', alertas: [] };
    vi.mocked(Services.postData).mockResolvedValue(estimacion);
    await service.estimar(2, false);
    expect(Services.postData).toHaveBeenCalledWith('/obras/2/estimacion?con_ia=false', null);
  });

  it('estimar con IA llama a postData con con_ia=true', async () => {
    const estimacion = { total_estimado: 1200, desglose_por_rubro: {}, margen_error_pct: 10, fuente: 'ia', alertas: [] };
    vi.mocked(Services.postData).mockResolvedValue(estimacion);
    await service.estimar(2, true);
    expect(Services.postData).toHaveBeenCalledWith('/obras/2/estimacion?con_ia=true', null);
  });
});

import { EstimacionResult } from '@common-interfaces/EstimacionResult.interface';
import { Obra, ObraCreate, ObraUpdate } from '@common-interfaces/Obra.interface';
import { deleteData, getData, patchData, postData } from './Services';

export class ObrasService {
  async list(): Promise<Array<Obra>> {
    return getData<Array<Obra>>('/obras');
  }

  async get(id: number): Promise<Obra> {
    return getData<Obra>(`/obras/${id}`);
  }

  async create(body: ObraCreate): Promise<Obra> {
    return postData<ObraCreate, Obra>('/obras', body);
  }

  async update(id: number, body: ObraUpdate): Promise<Obra> {
    return patchData<ObraUpdate, Obra>(`/obras/${id}`, body);
  }

  async remove(id: number): Promise<void> {
    return deleteData(`/obras/${id}`);
  }

  async estimar(id: number, conIa = false): Promise<EstimacionResult> {
    return postData<null, EstimacionResult>(`/obras/${id}/estimacion?con_ia=${conIa}`, null);
  }

  async warmupIa(): Promise<{ status: string }> {
    return postData<null, { status: string }>('/obras/warmup-ia', null);
  }
}

export const obrasService = new ObrasService();

import { EstimacionResult } from '@common-interfaces/EstimacionResult.interface';
import { Obra, ObraCreate, ObraUpdate } from '@common-interfaces/Obra.interface';
import { deleteData, getData, patchData, postData } from './Services';

const AI_API_BASE_URL = import.meta.env.VITE_AI_API_BASE_URL ?? 'http://localhost:8080';

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

  // Pinguea directo al multi-agente (no via BE). Render free tier solo
  // dispara spin-up cuando el request viene del edge externo (browser),
  // no servicio-a-servicio. Por eso el ping debe salir del browser.
  async warmupIa(): Promise<void> {
    await fetch(`${AI_API_BASE_URL}/warmup`, { method: 'GET', mode: 'cors' });
  }
}

export const obrasService = new ObrasService();

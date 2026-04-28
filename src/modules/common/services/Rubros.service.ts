import { Rubro, RubroCreate, RubroUpdate } from '@common-interfaces/Rubro.interface';
import { deleteData, getData, patchData, postData } from './Services';

export class RubrosService {
  async list(soloActivos = true): Promise<Array<Rubro>> {
    return getData<Array<Rubro>>(`/rubros?solo_activos=${soloActivos}`);
  }

  async create(body: RubroCreate): Promise<Rubro> {
    return postData<RubroCreate, Rubro>('/rubros', body);
  }

  async update(id: number, body: RubroUpdate): Promise<Rubro> {
    return patchData<RubroUpdate, Rubro>(`/rubros/${id}`, body);
  }

  async remove(id: number): Promise<void> {
    return deleteData(`/rubros/${id}`);
  }
}

export const rubrosService = new RubrosService();

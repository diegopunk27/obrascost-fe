import { Gasto, GastoCreate, GastoUpdate } from '@common-interfaces/Gasto.interface';
import { deleteData, getData, patchData, postData } from './Services';

export class GastosService {
  async list(obraId: number): Promise<Array<Gasto>> {
    return getData<Array<Gasto>>(`/obras/${obraId}/gastos`);
  }

  async create(obraId: number, body: GastoCreate): Promise<Gasto> {
    return postData<GastoCreate, Gasto>(`/obras/${obraId}/gastos`, body);
  }

  async update(obraId: number, gastoId: number, body: GastoUpdate): Promise<Gasto> {
    return patchData<GastoUpdate, Gasto>(`/obras/${obraId}/gastos/${gastoId}`, body);
  }

  async remove(obraId: number, gastoId: number): Promise<void> {
    return deleteData(`/obras/${obraId}/gastos/${gastoId}`);
  }
}

export const gastosService = new GastosService();

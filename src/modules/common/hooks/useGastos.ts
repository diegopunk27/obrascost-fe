import useSWR from 'swr';
import { gastosService } from '@common-services/Gastos.service';
import type { GastoCreate, GastoUpdate } from '@common-interfaces/Gasto.interface';

export const useGastos = (obraId: number | null) => {
  const key = obraId ? `/obras/${obraId}/gastos` : null;
  const { data, error, isLoading, mutate } = useSWR(key, () => gastosService.list(obraId!));

  const create = async (body: GastoCreate) => {
    await gastosService.create(obraId!, body);
    await mutate();
  };

  const update = async (gastoId: number, body: GastoUpdate) => {
    await gastosService.update(obraId!, gastoId, body);
    await mutate();
  };

  const remove = async (gastoId: number) => {
    await gastosService.remove(obraId!, gastoId);
    await mutate();
  };

  const total = (data ?? []).reduce((acc, g) => acc + g.monto, 0);

  return { gastos: data ?? [], error, isLoading, create, update, remove, total };
};

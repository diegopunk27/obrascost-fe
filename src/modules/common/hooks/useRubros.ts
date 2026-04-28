import useSWR from 'swr';
import { rubrosService } from '@common-services/Rubros.service';
import type { RubroCreate, RubroUpdate } from '@common-interfaces/Rubro.interface';

export const useRubros = (soloActivos = true) => {
  const key = `/rubros?solo_activos=${soloActivos}`;
  const { data, error, isLoading, mutate } = useSWR(key, () => rubrosService.list(soloActivos));

  const create = async (body: RubroCreate) => {
    await rubrosService.create(body);
    await mutate();
  };

  const update = async (id: number, body: RubroUpdate) => {
    await rubrosService.update(id, body);
    await mutate();
  };

  const remove = async (id: number) => {
    await rubrosService.remove(id);
    await mutate();
  };

  return { rubros: data ?? [], error, isLoading, create, update, remove };
};

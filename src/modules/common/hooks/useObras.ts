import useSWR, { mutate } from 'swr';
import { obrasService } from '@common-services/Obras.service';
import type { ObraCreate, ObraUpdate } from '@common-interfaces/Obra.interface';

const KEY = '/obras';

export const useObras = () => {
  const { data, error, isLoading, mutate: revalidate } = useSWR(KEY, () => obrasService.list());

  const create = async (body: ObraCreate) => {
    await obrasService.create(body);
    await revalidate();
  };

  const update = async (id: number, body: ObraUpdate) => {
    await obrasService.update(id, body);
    await revalidate();
  };

  const remove = async (id: number) => {
    await obrasService.remove(id);
    await revalidate();
  };

  return { obras: data ?? [], error, isLoading, create, update, remove, revalidate };
};

export const invalidateObras = () => mutate(KEY);

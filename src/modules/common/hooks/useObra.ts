import useSWR from 'swr';
import { obrasService } from '@common-services/Obras.service';
import type { EstimacionResult } from '@common-interfaces/EstimacionResult.interface';
import { useState } from 'react';

export const useObra = (id: number | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/obras/${id}` : null,
    () => obrasService.get(id!),
  );
  const [estimacion, setEstimacion] = useState<EstimacionResult | null>(null);
  const [estimando, setEstimando] = useState(false);

  const estimar = async (conIa = false) => {
    if (!id) return;
    setEstimando(true);
    try {
      const result = await obrasService.estimar(id, conIa);
      setEstimacion(result);
    } finally {
      setEstimando(false);
    }
  };

  return { obra: data, error, isLoading, mutate, estimacion, estimando, estimar };
};

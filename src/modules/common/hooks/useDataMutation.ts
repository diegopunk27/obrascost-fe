import { Mutation, Mutations } from '@common-interfaces/Mutation.interface';
import { useState } from 'react';
import useSWR, { SWRConfiguration, mutate as globalMutate } from 'swr';

export const useDataMutation = <ResponseType>(
  url: string,
  mutationMethods: Mutations<ResponseType>,
  mutationOptions?: SWRConfiguration,
) => {
  const [isFetchSlow, setIsFetchSlow] = useState(false);
  const { isLoading, error, data, mutate, isValidating } = useSWR<Array<ResponseType>>(
    url,
    mutationMethods.GET,
    mutationOptions ?? {
      loadingTimeout: 1500,
      errorRetryCount: 3,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      onLoadingSlow: () => {
        console.log('Ta lenta la cosa');
        setIsFetchSlow(true);
      },
    },
  );

  const handleMutation = async (mutationType: Mutation, newInput?, anotherEndpoint?: string) => {
    try {
      anotherEndpoint
        ? await globalMutate(
            anotherEndpoint,
            mutationMethods[mutationType](newInput) as Promise<Array<ResponseType>>,
            mutationOptions[mutationType](newInput),
          )
        : await mutate(
            mutationMethods[mutationType](newInput) as Promise<Array<ResponseType>>,
            mutationOptions[mutationType](newInput),
          );
      // Acá iría un toast o cualquier medio para comunicarle al user que se actualizó la data
    } catch (err) {
      // Acá iría un toast o cualquier medio para comunicarle al user que se actualizó la data
    }
  };

  return {
    isLoading,
    error,
    data,
    handleMutation,
    isFetchSlow,
    isValidating,
  };
};

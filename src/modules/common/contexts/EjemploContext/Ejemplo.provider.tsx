import { useDataMutation } from '@common-hooks/index';
import { Mutations } from '@common-interfaces/Mutation.interface';
import { EjemploService } from '@common-services/index';
import { ReactNode } from 'react';
import { SWRConfiguration } from 'swr';
import { EjemploContext } from './Ejemplo.context';

export interface Ejemplo {
  id: number;
  title: string;
  body: string;
}

const API_URL = 'string cualquiera';

const EjemploProvider = ({ children }: { children: ReactNode }) => {
  const service = new EjemploService();
  const EJEMPLO_MUTATIONS: Mutations<Ejemplo> = {
    GET: service.getEjemplo,
    DELETE: service.deleteEjemplo,
    PATCH: service.patchEjemplo,
    POST: service.postEjemplo,
    PUT: service.putEjemplo,
  };
  const EJEMPLO_OPTIONS: SWRConfiguration = {
    loadingTimeout: 1500,
    errorRetryCount: 3,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    onLoadingSlow: () => {
      console.log('Ta lenta la cosa');
    },
  };
  const { isLoading, error, data, handleMutation, isFetchSlow, isValidating } =
    useDataMutation<Ejemplo>(API_URL, EJEMPLO_MUTATIONS, EJEMPLO_OPTIONS);

  const handleGet = () => handleMutation('GET');
  const handlePut = (newInput) => handleMutation('PUT', newInput);
  const handlePatch = (newInput) => handleMutation('PATCH', newInput);
  const handlePost = (newInput) => handleMutation('POST', newInput);
  const handleDelete = (newInput) => handleMutation('DELETE', newInput);

  return (
    <EjemploContext.Provider
      value={{
        isFetchSlow,
        isLoading,
        isValidating,
        error,
        data,
        handleGet,
        handlePut,
        handlePatch,
        handlePost,
        handleDelete,
      }}
    >
      {children}
    </EjemploContext.Provider>
  );
};

export default EjemploProvider;

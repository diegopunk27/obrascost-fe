import { createContext } from 'react';
import { Ejemplo } from './Ejemplo.provider';

export interface EjemploState {
  isFetchSlow: boolean;
  data: Array<Ejemplo> | undefined;
  handleGet: () => Promise<void>;
  handleDelete: (data) => Promise<void>;
  handlePatch: (data) => Promise<void>;
  handlePost: (data) => Promise<void>;
  handlePut: (data) => Promise<void>;
  isLoading: boolean;
  isValidating: boolean;
  error: object;
}

export const EjemploContext = createContext<EjemploState | null>(null);

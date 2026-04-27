import { Ejemplo } from '@common-contexts/EjemploContext';

export interface ComponenteEjemplo {
  getEjemplo(): Promise<Array<Ejemplo>>;
  deleteEjemplo(): Promise<Ejemplo>;
  patchEjemplo(): Promise<Ejemplo>;
  postEjemplo(): Promise<Ejemplo>;
  putEjemplo(): Promise<Ejemplo>;
}

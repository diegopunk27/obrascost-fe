import { Ejemplo } from '@common-contexts/EjemploContext/Ejemplo.provider';
import { ComponenteEjemplo } from '@common-service-models/ComponenteEjemplo.interface';

export class EjemploService implements ComponenteEjemplo {
  public async getEjemplo(): Promise<Array<Ejemplo>> {
    return [
      {
        id: 1,
        title: 'Ejemplo 1',
      },
      {
        id: 2,
        title: 'Ejemplo 1',
      },
    ] as Array<Ejemplo>;
  }

  public async deleteEjemplo(): Promise<Ejemplo> {
    alert('DELETE');
    return new Promise(() => {
      setTimeout(() => {
        return {
          id: 2,
          title: 'Ejemplo 1',
        } as Ejemplo;
      }, 500);
    });
  }

  public async patchEjemplo(): Promise<Ejemplo> {
    alert('PATCH');
    return new Promise(() => {
      setTimeout(() => {
        return {
          id: 2,
          title: 'Ejemplo 1',
        };
      }, 500);
    });
  }

  public async postEjemplo(): Promise<Ejemplo> {
    alert('POST');
    return new Promise(() => {
      setTimeout(() => {
        return {
          id: 2,
          title: 'Ejemplo 1',
        };
      }, 500);
    });
  }

  public async putEjemplo(): Promise<Ejemplo> {
    alert('PUT');
    return new Promise(() => {
      setTimeout(() => {
        return {
          id: 2,
          title: 'Ejemplo 1',
        };
      }, 500);
    });
  }
}

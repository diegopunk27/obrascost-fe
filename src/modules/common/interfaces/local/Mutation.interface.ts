type Mutation = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

interface Mutations<ResponseType> {
  GET: (data) => Promise<Array<ResponseType>>;
  DELETE?: (data) => Promise<ResponseType>;
  PATCH?: (data) => Promise<ResponseType>;
  POST?: (data) => Promise<ResponseType>;
  PUT?: (data) => Promise<ResponseType>;
}

export type { Mutation, Mutations };

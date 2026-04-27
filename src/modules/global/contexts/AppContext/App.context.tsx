import { createContext } from 'react';

interface AppState {
  token: string;
}

export const AppContext = createContext<AppState>(null);

import { CurrentUser } from '@common-interfaces/Auth.interface';
import { createContext } from 'react';

interface AppState {
  token: string | null;
  user: CurrentUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AppContext = createContext<AppState>({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
});

import { CurrentUser } from '@common-interfaces/Auth.interface';
import { authService } from '@common-services/Auth.service';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AppContext } from './App.context';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => authService.getToken());
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    if (token) {
      authService.getMe().then(setUser).catch(() => {
        authService.logout();
        setToken(null);
      });
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    setToken(res.access_token);
    const me = await authService.getMe();
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AppContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import { ReactNode } from 'react';
import { AppContext } from './App.context';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const value = 'yas';
  return <AppContext.Provider value={{ token: value }}>{children}</AppContext.Provider>;
};

export default AppProvider;

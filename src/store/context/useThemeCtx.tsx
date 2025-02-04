import { IThemeStore } from '@/types/interfaces';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const ThemeContext = createContext<IThemeStore>({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeCtx = () => {
  return useContext(ThemeContext);
};

export default ThemeContextProvider;

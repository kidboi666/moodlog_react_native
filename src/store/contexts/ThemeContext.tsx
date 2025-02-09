import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { IThemeStore } from '@/types/interfaces';
import { Theme } from 'tamagui';

export const ThemeContext = createContext<IThemeStore | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme name={theme}>{children}</Theme>
    </ThemeContext.Provider>
  );
};

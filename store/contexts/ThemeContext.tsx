import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { IThemeStore } from '@/types/interfaces';
import { Theme } from 'tamagui';

export const ThemeContext = createContext<IThemeStore | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <Theme name={currentTheme}>{children}</Theme>
    </ThemeContext.Provider>
  );
};

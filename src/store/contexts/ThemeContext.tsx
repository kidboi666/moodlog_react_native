import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IThemeStore } from '@/types/interfaces';
import { Theme } from 'tamagui';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext<IThemeStore | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');
  const colorScheme = useColorScheme();

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    colorScheme === 'dark' ? setCurrentTheme('dark') : setCurrentTheme('light');
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <Theme name={currentTheme}>{children}</Theme>
    </ThemeContext.Provider>
  );
};

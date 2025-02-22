import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ThemeStore } from 'src/types/store';
import { Theme } from 'tamagui';
import { useColorScheme } from 'react-native';
import { Nullable } from '@/types/utils';

export const ThemeContext = createContext<Nullable<ThemeStore>>(null);

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

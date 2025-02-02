import { COLOR_THEMES } from '@/constants/colors';
import { IThemeStore } from '@/types/interfaces';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext<IThemeStore>({
  colors: COLOR_THEMES.light,
  isDark: false,
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  const colors = useMemo(
    () => (isDark ? COLOR_THEMES.dark : COLOR_THEMES.light),
    [isDark],
  );

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark]);

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeContextProvider;

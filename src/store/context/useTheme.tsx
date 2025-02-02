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
  barStyle: 'light-content',
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  const colors = useMemo(
    () => (isDark ? COLOR_THEMES.dark : COLOR_THEMES.light),
    [isDark],
  );

  const barStyle = useMemo(
    () => (isDark ? 'dark-content' : 'light-content'),
    [isDark],
  ) as IThemeStore['barStyle'];

  const toggleTheme = useCallback((selectedTheme: boolean) => {
    setIsDark(selectedTheme);
  }, []);

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const value = useMemo(
    () => ({ colors, isDark, toggleTheme, barStyle }),
    [colors, isDark, toggleTheme, barStyle],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeContextProvider;

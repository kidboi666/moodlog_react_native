import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ThemeStore } from '@/types/store';
import { Theme as TamaguiTheme } from 'tamagui';
import { useColorScheme } from 'react-native';
import { Nullable } from '@/types/utils';
import { Theme } from '@/types/enums';

export const ThemeContext = createContext<Nullable<ThemeStore>>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');
  const colorScheme = useColorScheme();
  const resolvedTheme =
    currentTheme !== 'system'
      ? currentTheme
      : colorScheme === 'dark'
        ? 'dark'
        : 'light';

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  useEffect(() => {
    if (__DEV__) {
      console.log('theme changed', resolvedTheme);
    }
  }, [colorScheme, currentTheme]);

  return (
    <ThemeContext.Provider value={{ resolvedTheme, currentTheme, changeTheme }}>
      <TamaguiTheme name={resolvedTheme}>{children}</TamaguiTheme>
    </ThemeContext.Provider>
  );
};

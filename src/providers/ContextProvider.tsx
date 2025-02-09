import { DiaryContextProvider } from '@/store/useDiary';
import { ThemeContextProvider } from '@/store/useThemeContext';
import { PropsWithChildren } from 'react';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <DiaryContextProvider>{children}</DiaryContextProvider>
    </ThemeContextProvider>
  );
};

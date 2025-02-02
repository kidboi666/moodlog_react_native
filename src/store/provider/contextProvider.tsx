import DiaryContextProvider from '@/store/context/useDiary';
import ThemeContextProvider from '@/store/context/useTheme';
import { PropsWithChildren } from 'react';

const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <DiaryContextProvider>{children}</DiaryContextProvider>;
    </ThemeContextProvider>
  );
};

export default ContextProvider;

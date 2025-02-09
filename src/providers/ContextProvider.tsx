import { PropsWithChildren } from 'react';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { ThemeContextProvider } from '@/store/contexts/ThemeContext';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <JournalContextProvider>{children}</JournalContextProvider>
    </ThemeContextProvider>
  );
};

import { PropsWithChildren } from 'react';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { ThemeContextProvider } from '@/store/contexts/ThemeContext';
import { DrawerContextProvider } from '@/store/contexts/DrawerContext';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <DrawerContextProvider>
      <ThemeContextProvider>
        <JournalContextProvider>{children}</JournalContextProvider>
      </ThemeContextProvider>
    </DrawerContextProvider>
  );
};

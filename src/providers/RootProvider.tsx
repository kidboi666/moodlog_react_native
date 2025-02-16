import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
import { useColorScheme } from 'react-native';
import { ThemeContextProvider } from '@/store/contexts/ThemeContext';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { AppContextProvider } from '@/store/contexts/AppContext';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ThemeContextProvider>
        <ToastProvider>
          <PortalProvider>
            <JournalContextProvider>
              <AppContextProvider>{children}</AppContextProvider>
            </JournalContextProvider>
          </PortalProvider>
        </ToastProvider>
      </ThemeContextProvider>
    </TamaguiBaseProvider>
  );
};

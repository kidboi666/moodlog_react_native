import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
import { useColorScheme } from 'react-native';
import { ThemeContextProvider } from '@/store/contexts/ThemeContext';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { AppContextProvider } from '@/store/contexts/AppContext';
import { BottomModalContextProvider } from '@/store/contexts/BottomModalContext';

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
              <BottomModalContextProvider>
                <AppContextProvider>{children}</AppContextProvider>
              </BottomModalContextProvider>
            </JournalContextProvider>
          </PortalProvider>
        </ToastProvider>
      </ThemeContextProvider>
    </TamaguiBaseProvider>
  );
};

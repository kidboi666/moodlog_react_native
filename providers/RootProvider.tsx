import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
import { useColorScheme } from 'react-native';
import { CurrentToast } from '@/components/CurrentToast';
import { ThemeContextProvider } from '@/store/contexts/ThemeContext';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { DrawerContextProvider } from '@/store/contexts/DrawerContext';
import { AppContextProvider } from '@/store/contexts/AppContext';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ThemeContextProvider>
        <DrawerContextProvider>
          <ToastProvider>
            <JournalContextProvider>
              <PortalProvider>
                <AppContextProvider>
                  {children}
                  <CurrentToast />
                </AppContextProvider>
              </PortalProvider>
            </JournalContextProvider>
          </ToastProvider>
        </DrawerContextProvider>
      </ThemeContextProvider>
    </TamaguiBaseProvider>
  );
};

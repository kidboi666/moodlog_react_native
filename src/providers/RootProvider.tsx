import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
import { useColorScheme } from 'react-native';
import { ThemeContextProvider } from '@/store/contexts/ThemeContext';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { AppContextProvider } from '@/store/contexts/AppContext';
import { UserContextProvider } from '@/store/contexts/UserContext';
import { DevContextProvider } from '@/store/contexts/DevContext';
import { DateContextProvider } from '@/store/contexts/DateContext';
import { StatisticsContextProvider } from '@/store/contexts/StatisticsContext';
import { ScrollContextProvider } from '@/store/contexts/ScrollContext';

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
            <DateContextProvider>
              <JournalContextProvider>
                <StatisticsContextProvider>
                  <AppContextProvider>
                    <ScrollContextProvider>
                      <UserContextProvider>
                        <DevContextProvider>{children}</DevContextProvider>
                      </UserContextProvider>
                    </ScrollContextProvider>
                  </AppContextProvider>
                </StatisticsContextProvider>
              </JournalContextProvider>
            </DateContextProvider>
          </PortalProvider>
        </ToastProvider>
      </ThemeContextProvider>
    </TamaguiBaseProvider>
  );
};

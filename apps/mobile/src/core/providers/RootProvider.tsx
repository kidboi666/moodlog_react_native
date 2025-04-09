import { useColorScheme } from 'react-native';
import { PortalProvider, type TamaguiProviderProps } from 'tamagui';

import { ThemeProvider } from '@/core/store/theme.store';

import { TamaguiBaseProvider } from './TamaguiProvider';
import { TamaguiToastProvider } from './ToastProvider';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ThemeProvider>
        <TamaguiToastProvider>
          <PortalProvider>{children}</PortalProvider>
        </TamaguiToastProvider>
      </ThemeProvider>
    </TamaguiBaseProvider>
  );
};

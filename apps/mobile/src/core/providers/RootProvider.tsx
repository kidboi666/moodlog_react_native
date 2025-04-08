import { useColorScheme } from 'react-native';

import { PortalProvider, type TamaguiProviderProps } from 'tamagui';

import { ContextProvider } from '@/core/providers/ContextProvider';
import { ThemeContextProvider } from '@/core/store/contexts/theme.context';

import { TamaguiBaseProvider } from './TamaguiProvider';
import { TamaguiToastProvider } from './ToastProvider';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ThemeContextProvider>
        <TamaguiToastProvider>
          <PortalProvider>
            <ContextProvider>{children}</ContextProvider>
          </PortalProvider>
        </TamaguiToastProvider>
      </ThemeContextProvider>
    </TamaguiBaseProvider>
  );
};

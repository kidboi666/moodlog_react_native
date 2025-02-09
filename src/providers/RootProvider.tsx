import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ContextProvider } from '@/providers/ContextProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { TamaguiBaseProvider } from '@/providers/TamaguiProvider';
import { useColorScheme } from 'react-native';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ContextProvider>
        <PortalProvider>
          <ToastProvider>{children}</ToastProvider>
        </PortalProvider>
      </ContextProvider>
    </TamaguiBaseProvider>
  );
};

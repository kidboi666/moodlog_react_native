import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ContextProvider } from '@/providers/ContextProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { TamaguiBaseProvider } from '@/providers/TamaguiProvider';
import { useColorScheme } from 'react-native';
import { CurrentToast } from '@/components/CurrentToast';

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme();

  return (
    <TamaguiBaseProvider colorScheme={colorScheme} {...rest}>
      <ToastProvider>
        <PortalProvider>
          <ContextProvider>
            {children}
            <CurrentToast />
          </ContextProvider>
        </PortalProvider>
      </ToastProvider>
    </TamaguiBaseProvider>
  );
};

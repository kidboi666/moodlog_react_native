import { PortalProvider, type TamaguiProviderProps } from 'tamagui';
import { ContextProvider } from './ContextProvider';
import { ToastProvider } from './ToastProvider';
import { TamaguiBaseProvider } from './TamaguiProvider';
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

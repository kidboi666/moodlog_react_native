import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui';
import config from 'tamagui.config';

interface Props extends Omit<TamaguiProviderProps, 'config'> {
  colorScheme?: 'dark' | 'light' | null;
}

export const TamaguiBaseProvider = ({
  children,
  colorScheme,
  ...rest
}: Props) => {
  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      {children}
    </TamaguiProvider>
  );
};

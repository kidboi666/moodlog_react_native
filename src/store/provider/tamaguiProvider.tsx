import { PropsWithChildren } from 'react';
import { TamaguiProvider as TamaguiMainProvider, Theme } from 'tamagui';
import { config } from '../../../tamagui.config';
import { useTheme } from '../context/useTheme';

export const TamaguiProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  return (
    <TamaguiMainProvider config={config}>
      <Theme name={theme}>{children}</Theme>
    </TamaguiMainProvider>
  );
};

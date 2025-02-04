import { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { Stack, useTheme, ViewProps } from 'tamagui';

type Props = Omit<ViewProps, keyof SafeAreaViewProps>;

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: theme.bgPrimary.get(), flex: 1 }}>
      <Stack flex={1} p="$4" bg="$bgPrimary" {...props}>
        {children}
      </Stack>
    </SafeAreaView>
  );
};

Container.displayName = 'Container';

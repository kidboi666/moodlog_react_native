import { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { View, ViewProps } from 'tamagui';

type Props = Omit<ViewProps, keyof SafeAreaViewProps>;

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <SafeAreaView style={{ backgroundColor: '$backgroundPrimary', flex: 1 }}>
      <View {...props}>{children}</View>
    </SafeAreaView>
  );
};

Container.displayName = 'Container';

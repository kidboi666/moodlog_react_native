import { useTheme } from '@/store/context/useTheme';
import { getToken } from '@tamagui/core';
import { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { View, ViewProps } from 'tamagui';

type Props = Omit<ViewProps, keyof SafeAreaViewProps>;

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          theme === 'dark'
            ? getToken('$color.grey900')
            : getToken('$color.grey100'),
        flex: 1,
      }}>
      <View flex={1} bg="$bgPrimary" {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};

Container.displayName = 'Container';

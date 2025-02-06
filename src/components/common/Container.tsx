import { styled, ViewProps } from 'tamagui';
import { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

const StyledView = styled(SafeAreaView, {
  bg: '$bgPrimary',
  flex: 1,
  p: '$4',
});

type Props = Omit<ViewProps, keyof SafeAreaViewProps>;

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <StyledView {...props}>{children}</StyledView>;
};

Container.displayName = 'Container';

import { View, ViewProps } from 'tamagui';
import {
  CONTAINER_MARGIN_TOP,
  CONTAINER_PADDING_BOTTOM,
  CONTAINER_SPACING,
} from '@/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
  Header?: ReactNode;
}

export const Container = ({ children, Header, edges, ...props }: Props) => {
  const insets = useSafeAreaInsets();

  const safeAreaMargins = {
    mt: edges?.includes('top') ? insets.top + CONTAINER_MARGIN_TOP : 0,
    mb: edges?.includes('bottom')
      ? insets.bottom + CONTAINER_PADDING_BOTTOM
      : 0,
  };

  return (
    <View flex={1} px={CONTAINER_SPACING} {...safeAreaMargins} {...props}>
      {Header && Header}
      {children}
    </View>
  );
};

Container.displayName = 'Container';

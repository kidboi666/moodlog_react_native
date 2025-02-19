import { View, ViewProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
}

export const Container = ({ children, edges, ...props }: Props) => {
  const insets = useSafeAreaInsets();

  const safeAreaMargins = {
    mt: edges?.includes('top') ? insets.top : 0,
    mb: edges?.includes('bottom') ? insets.bottom : 0,
  };

  return (
    <View flex={1} px={CONTAINER_SPACING} {...safeAreaMargins} {...props}>
      {children}
    </View>
  );
};

Container.displayName = 'Container';

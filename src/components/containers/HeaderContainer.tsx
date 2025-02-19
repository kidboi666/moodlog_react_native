import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
}

export const HeaderContainer = ({
  children,
  edges = ['top'],
  ...props
}: Props) => {
  const insets = useSafeAreaInsets();

  const safeAreaMargins = {
    mt: edges.includes('top') ? insets.top : 0,
    mb: edges.includes('bottom') ? insets.bottom : 0,
  };

  return (
    <View px={CONTAINER_SPACING} {...safeAreaMargins} {...props}>
      {children}
    </View>
  );
};

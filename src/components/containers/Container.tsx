import { View, ViewProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
}

export const Container = ({ children, edges, ...props }: Props) => {
  const insets = useSafeAreaInsets();

  const safeAreaMargins = {
    ...(edges?.includes('top') && { mt: insets.top }),
    ...(edges?.includes('bottom') && { mb: insets.bottom }),
  };

  return (
    <View flex={1} px={CONTAINER_SPACING} {...safeAreaMargins} {...props}>
      {children}
    </View>
  );
};

Container.displayName = 'Container';

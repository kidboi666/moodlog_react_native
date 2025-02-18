import { View, ViewProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Container = ({ children, ...props }: ViewProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View flex={1} p={CONTAINER_SPACING} mb={insets.bottom} {...props}>
      {children}
    </View>
  );
};

Container.displayName = 'Container';

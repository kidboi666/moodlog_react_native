import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const DrawerContainer = ({ children, ...props }: ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      flex={1}
      mt={insets.top + CONTAINER_SPACING / 2}
      mb={insets.bottom}
      px={CONTAINER_SPACING}
      {...props}
    >
      {children}
    </View>
  );
};

DrawerContainer.displayName = 'DrawerContainer';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const HeaderContainer = ({ children, ...props }: ViewProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View mt={insets.top} p={CONTAINER_SPACING} {...props}>
      {children}
    </View>
    // <SafeAreaView
    //   style={[
    //     {
    //       backgroundColor: theme.background.val,
    //       padding: CONTAINER_SPACING,
    //     },
    //     style,
    //   ]}
    //   edges={['top']}
    // >
    //   {children}
    // </SafeAreaView>
  );
};

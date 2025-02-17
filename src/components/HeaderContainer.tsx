import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const HeaderContainer = ({ children, style }: SafeAreaViewProps) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: theme.background.val,
          padding: CONTAINER_SPACING,
        },
        style,
      ]}
      edges={['top']}
    >
      {children}
    </SafeAreaView>
  );
};

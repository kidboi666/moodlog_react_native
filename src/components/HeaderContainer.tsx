import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { LinearGradient } from '@tamagui/linear-gradient';

export const HeaderContainer = ({ children }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        padding: CONTAINER_SPACING,
      }}
      edges={['top']}
    >
      {children}
    </SafeAreaView>
  );
};

export const HeaderContainerWithLinearGradient = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        width: '100%',
        padding: CONTAINER_SPACING,
      }}
      edges={['top']}
    >
      <LinearGradient {...props}>{children}</LinearGradient>
    </SafeAreaView>
  );
};

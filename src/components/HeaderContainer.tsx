import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const HeaderContainer = ({ children }) => {
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
      {children}
    </SafeAreaView>
  );
};

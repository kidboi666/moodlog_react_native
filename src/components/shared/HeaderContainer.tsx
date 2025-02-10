import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

export const HeaderContainer = ({ ...props }: SafeAreaViewProps) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        width: '100%',
        padding: 16,
      }}
      edges={['top']}
      {...props}
    />
  );
};

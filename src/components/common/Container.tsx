import { useTheme } from '@/store/context/useTheme';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

interface Props extends SafeAreaViewProps {}

export const Container = ({ style, ...props }: Props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[{ backgroundColor: colors.background.primary, flex: 1 }, style]}
      {...props}
    />
  );
};

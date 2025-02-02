import { useTheme } from '@/store/context/useTheme';
import { ScrollView, ScrollViewProps } from 'react-native';

interface Props extends ScrollViewProps {}

export const ThemedScrollView = ({ style, ...props }: Props) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: colors.background.primary, flex: 1 }, style]}
      {...props}
    />
  );
};

ThemedScrollView.displayName = 'ThemedScrollView';

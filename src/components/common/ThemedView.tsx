import { useTheme } from '@/store/context/useTheme';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const ThemedView = ({ style, ...props }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: colors.background.primary }, style]}
      {...props}
    />
  );
};

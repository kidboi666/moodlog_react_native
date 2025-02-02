import { useTheme } from '@/store/context/useTheme';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {}

export const ThemedText = ({ style, ...props }: Props) => {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text.primary }, style]} {...props} />;
};

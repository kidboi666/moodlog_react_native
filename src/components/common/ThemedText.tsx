import { useTheme } from '@/store/context/useTheme';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
}

export const ThemedText = ({ style, variant = 'primary', ...props }: Props) => {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text[variant] }, style]} {...props} />;
};

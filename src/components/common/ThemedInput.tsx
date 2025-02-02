import { useTheme } from '@/store/context/useTheme';
import { TextInput, TextInputProps } from 'react-native';

export interface ThemedInputProps extends TextInputProps {}

export const ThemedInput = ({ style, ...props }: ThemedInputProps) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[{ backgroundColor: colors.background.tertiary }, style]}
      {...props}
    />
  );
};

ThemedInput.displayName = 'ThemedInput';

import { useTheme } from '@/store/context/useTheme';
import { memo, useMemo } from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'placeholder';
}

export const ThemedText = memo(
  ({ style, variant = 'primary', ...props }: Props) => {
    const { colors } = useTheme();

    const textVariant = useMemo(
      () =>
        ({
          primary: { color: colors.text.primary },
          secondary: { color: colors.text.secondary },
          tertiary: { color: colors.text.tertiary },
          placeholder: { color: colors.text.placeholder },
        }[variant]),
      [colors, variant],
    );
    return <Text style={[{ ...textVariant }, style]} {...props} />;
  },
);

ThemedText.displayName = 'ThemedText';

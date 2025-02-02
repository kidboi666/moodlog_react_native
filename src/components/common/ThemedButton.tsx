import { useTheme } from '@/store/context/useTheme';
import { memo, useMemo } from 'react';
import {
  Platform,
  Pressable,
  Text,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export const ThemedButton = memo(
  ({
    style,
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    ...props
  }: Props) => {
    const { colors } = useTheme();

    const buttonVariant = useMemo(
      () =>
        ({
          primary: {
            backgroundColor: colors.button.primary,
          },
          secondary: {
            backgroundColor: colors.button.secondary,
          },
          tertiary: {
            backgroundColor: colors.button.tertiary,
          },
          outline: {
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderColor: colors.button.disabled,
          },
        }[variant]),
      [colors, variant],
    );

    const textVariant = useMemo(
      () =>
        ({
          primary: { color: colors.buttonText.primary },
          secondary: { color: colors.buttonText.secondary },
          tertiary: { color: colors.buttonText.tertiary },
          outline: { color: colors.buttonText.primary },
        }[variant]),
      [colors, variant],
    );

    const buttonSizes = useMemo(
      () =>
        ({
          sm: {
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
          },
          md: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          },
          lg: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
          },
        }[size]),
      [size],
    );

    const buttonProps = Platform.select({
      ios: {
        style: ({ pressed }: { pressed: boolean }) => [
          { opacity: pressed ? 0.7 : 1, ...buttonVariant, ...buttonSizes },
          style,
        ],
      },
      android: {
        android_ripple: {
          color: 'rgba(0, 0, 0, 0.2)',
          borderless: false,
        },
        style: [{ ...buttonVariant, ...buttonSizes }, style],
      },
    });

    return (
      <Pressable {...buttonProps} disabled={disabled} {...props}>
        <View>
          <Text style={{ ...textVariant }}>{children}</Text>
        </View>
      </Pressable>
    );
  },
);

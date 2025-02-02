import { useTheme } from '@/store/context/useTheme';
import { memo, PropsWithChildren, useMemo } from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Props extends PressableProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text';
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = memo(
  ({
    style,
    textStyle,
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    ...props
  }: PropsWithChildren<Props>) => {
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
            borderWidth: 1,
            borderColor: colors.button.disabled,
          },
          text: {
            backgroundColor: 'transparent',
          },
        }[variant]),
      [colors, variant],
    );

    const buttonTextVariant = useMemo(() => {
      return {
        primary: { color: colors.buttonText.primary },
        secondary: { color: colors.buttonText.secondary },
        tertiary: { color: colors.buttonText.tertiary },
        outline: { color: colors.buttonText.primary },
        text: {},
      }[variant];
    }, [colors, variant]);

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

    return (
      <Pressable
        style={({ pressed }) => [
          Platform.select({
            ios: { opacity: pressed ? 0.7 : 1 },
            android: {},
          }),
          buttonVariant,
          buttonSizes,
          style,
        ]}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.2)',
          borderless: false,
        }}
        disabled={disabled}
        {...props}>
        <View>
          <Text style={[{ ...buttonTextVariant }, textStyle]}>{children}</Text>
        </View>
      </Pressable>
    );
  },
);

Button.displayName = 'ThemedButton';

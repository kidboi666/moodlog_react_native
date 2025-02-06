import { Button as TamaguiButton, GetProps, styled } from 'tamagui';

export const StyledButton = styled(TamaguiButton, {
  name: 'ThemedButton',
  bg: '$buttonPrimary',
  fontFamily: '$body',
  color: '$buttonTextPrimary',
  animation: 'quick',
  variants: {
    variant: {
      primary: { bg: '$buttonPrimary', color: '$buttonTextPrimary' },
      secondary: { bg: '$buttonSecondary', color: '$buttonTextSecondary' },
      tertiary: { bg: '$buttonTertiary', color: '$textPrimary' },
      outlined: {
        bg: 'transparent',
        borderWidth: 1,
        borderColor: '$buttonPrimary',
        color: '$textPrimary',
      },
      text: {
        bg: 'transparent',
        borderWidth: 0,
      },
    },
    size: {
      sm: {
        py: 6,
        px: 10,
        borderRadius: 6,
      },
      md: {
        py: 8,
        px: 16,
        borderRadius: 8,
      },
      lg: {
        py: 12,
        px: 24,
        borderRadius: 12,
      },
      none: {
        py: 0,
        px: 0,
        borderRadius: 0,
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type Props = GetProps<typeof StyledButton>;

export const Button = ({
  variant,
  size,
  disabled = false,
  ...props
}: Props) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      pressStyle={{ opacity: 0.7 }}
      {...props}
    />
  );
};

Button.displayName = 'ThemedButton';

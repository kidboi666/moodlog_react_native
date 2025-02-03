import { Button as TamaguiButton, styled } from 'tamagui';

export const StyledButton = styled(TamaguiButton, {
  name: 'ThemedButton',
  animation: 'medium',
  variants: {
    variant: {
      primary: {
        bg: '$buttonPrimary',
        color: '$buttonTextPrimary',
      },
      secondary: {
        bg: '$buttonSecondary',
        color: '$buttonTextSecondary',
      },
      tertiary: {
        bg: '$buttonTertiary',
        color: '$buttonTextTertiary',
      },
      outlined: {
        bg: 'transparent',
        borderWidth: 1,
        borderColor: '$buttonDisabled',
        color: '$textPrimary',
      },
      text: {
        color: '$textPrimary',
      },
    },
    size: {
      sm: {
        py: 6,
        px: 12,
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

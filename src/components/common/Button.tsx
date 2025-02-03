import { GetProps } from '@tamagui/core';
import { Button as TamaguiButton, styled } from 'tamagui';

const StyledButton = styled(TamaguiButton, {
  name: 'ThemedButton',
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
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type Props = GetProps<typeof StyledButton>;

export const Button = ({
  variant = 'primary',
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

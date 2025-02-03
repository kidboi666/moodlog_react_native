import { GetProps } from '@tamagui/core';
import { memo } from 'react';
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
        color: '$buttonTextPrimary',
      },
      text: {
        bg: 'transparent',
        color: '$buttonTextPrimary',
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

export const Button = memo(
  ({ variant = 'primary', size, disabled = false, ...props }: Props) => {
    console.log(variant);
    return (
      <StyledButton
        variant={variant}
        size={size}
        disabled={disabled}
        pressStyle={{ opacity: 0.7 }}
        {...props}
      />
    );
  },
);

Button.displayName = 'ThemedButton';

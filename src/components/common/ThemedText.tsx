import { GetProps } from '@tamagui/core';
import { memo } from 'react';
import { styled, Text as TamaguiText } from 'tamagui';

const StyledText = styled(TamaguiText, {
  name: 'ThemedText',
  color: '$textPrimary',
  fontFamily: '$body',
  variants: {
    variant: {
      primary: {
        color: '$textPrimary',
      },
      secondary: {
        color: '$textSecondary',
      },
      tertiary: {
        color: '$textTertiary',
      },
      placeholder: {
        color: '$textPlaceholder',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
  },
});

type Props = GetProps<typeof StyledText>;

export const Text = memo(({ variant = 'primary', ...props }: Props) => {
  return <StyledText variant={variant} {...props} />;
});

Text.displayName = 'ThemedText';

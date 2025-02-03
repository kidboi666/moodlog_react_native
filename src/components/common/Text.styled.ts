import { styled, Text } from 'tamagui';

export const StyledText = styled(Text, {
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

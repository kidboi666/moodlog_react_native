import { Button, styled } from 'tamagui';

export const StyledMenuButton = styled(Button, {
  name: 'MenuButton',
  flex: 1,
  animation: 'medium',
  height: '100%',
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
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
  },
});

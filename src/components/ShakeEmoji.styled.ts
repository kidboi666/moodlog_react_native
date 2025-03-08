import { Button, styled } from 'tamagui';

export const EmojiButton = styled(Button, {
  unstyled: true,
  animation: 'quick',
  pressStyle: {
    scale: 0.85,
  },

  variants: {
    isRotate: {
      true: {
        rotate: '40deg',
      },
    },
  } as const,
});

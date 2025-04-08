import { Text, styled } from 'tamagui';

export const CharNum = styled(Text, {
  color: '$color10',
  position: 'absolute',
  fontWeight: '700',
  r: 8,
  b: 8,

  variants: {
    isGreen: {
      true: {
        color: '$green10',
      },
    },

    isYellow: {
      true: {
        color: '$yellow10',
      },
    },
    isRed: {
      true: {
        color: '$red10',
      },
    },
  } as const,
});

import { Text, styled } from 'tamagui'

export const CharNum = styled(Text, {
  color: '$color10',
  fontWeight: '800',

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
})

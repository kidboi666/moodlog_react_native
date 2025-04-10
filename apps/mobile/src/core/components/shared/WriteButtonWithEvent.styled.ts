import { View, styled } from 'tamagui'

export const WriteTabContainer = styled(View, {
  position: 'relative',
})

export const WriteButton = styled(TabButton, {
  bg: '$color12',
  color: '$color1',
})

export const IconBox = styled(View, {
  animation: 'lazy',

  variants: {
    menuVisible: {
      true: {
        rotate: '45deg',
      },
      false: {
        rotate: '0deg',
      },
    },
  } as const,
})

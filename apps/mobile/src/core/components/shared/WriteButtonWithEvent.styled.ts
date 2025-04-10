import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import { View, styled } from 'tamagui'

export const WriteTabContainer = styled(View, {
  position: 'relative',
})

const TabButton = styled(PressableButton, {
  color: '$color9',
  bg: '$color5',
  elevate: false,

  variants: {
    isTabActive: {
      true: {
        color: '$color11',
        bg: '$backgroundStrong',
      },
    },
  } as const,
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

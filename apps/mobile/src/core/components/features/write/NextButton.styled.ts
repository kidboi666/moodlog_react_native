import { Button, View, styled } from 'tamagui'

import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/styles/animations'

export const AnimatedContainer = styled(View, {
  items: 'center',
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
})

export const NextButton = styled(Button, {
  p: '$4',
  bg: '$gray12',
  color: '$gray1',
  rounded: '$4',
  scaleIcon: 1.5,
  animation: 'lazy',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
  opacity: 1,

  variants: {
    disabled: {
      true: {
        opacity: 0.4,
      },
    },
  } as const,
})

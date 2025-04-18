import { View, styled } from 'tamagui'

import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations'

export const FadeInContainer = styled(View, {
  animation: 'lazy',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,

  variants: {
    isVisible: {
      false: {
        opacity: 0,
      },
    },
  } as const,
})

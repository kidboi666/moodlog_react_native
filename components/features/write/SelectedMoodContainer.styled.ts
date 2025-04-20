import { XStack, styled } from 'tamagui'

import { H2 } from '@/components/shared/Heading'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants/animations'

export const XStackContainer = styled(XStack, {
  items: 'center',
  justify: 'center',
  animation: 'medium',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  gap: '$2',
  flex: 1,
})

export const MoodLevelText = styled(H2, {
  color: '$color11',
})

export const MoodTypeText = styled(H2)

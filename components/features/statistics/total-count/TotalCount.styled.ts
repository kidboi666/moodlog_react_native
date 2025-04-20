import { YStack, styled } from 'tamagui'

import { PRESS_STYLE } from '@/constants/animations'

export const CardContainer = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  p: '$4',
  animation: 'medium',
  pressStyle: PRESS_STYLE,
})

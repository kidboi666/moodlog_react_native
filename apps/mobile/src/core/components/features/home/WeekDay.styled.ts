import { XStack, styled } from 'tamagui'

import { H1 } from '@/core/components/shared/Heading'
import { LinearGradient } from 'tamagui/linear-gradient'

export const OuterGradientBox = styled(LinearGradient, {
  p: '$1.5',
  rounded: '$8',
  colors: ['$gray12', '$gray11'],
  start: [0, -0.6],
  end: [2, 0],
})

export const InnerGradientBox = styled(LinearGradient, {
  p: '$4',
  rounded: '$7',
  colors: ['$gray11', '$gray12'],
  start: [0, -0.6],
  end: [0.3, 0],
})

export const CurrentMonthBox = styled(XStack, {
  justify: 'space-between',
})

export const CurrentMonthText = styled(H1, {
  color: '$gray1',
})

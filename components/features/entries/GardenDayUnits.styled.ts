import { View, YStack, styled } from 'tamagui'

import { H6 } from '@/components/shared/Heading'

export const DaysContainer = styled(YStack, {
  py: '$4',
})

export const EmptyBox = styled(View, {
  width: '$2',
  height: '$2',
})

export const DaysBox = styled(YStack, {
  flex: 1,
  height: '100%',
  justify: 'space-between',
})

export const DayText = styled(H6, {
  fontSize: '$3',
  color: '$color10',
})

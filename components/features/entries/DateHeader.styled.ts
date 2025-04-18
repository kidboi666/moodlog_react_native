import { XStack, YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'

export const DateHeaderContainer = styled(XStack, {
  mt: '$6',
  mb: '$3',
  px: '$2',
  items: 'center',
  gap: '$3',
})

export const DateCircle = styled(XStack, {
  width: 52,
  height: 52,
  rounded: 26,
  bg: '$gray2',
  borderWidth: 1,
  borderColor: '$gray4',
  justify: 'center',
  items: 'center',
  shadowColor: '$gray8',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
})

export const DateTextStack = styled(YStack, {
  items: 'center',
})

export const DayText = styled(BaseText, {
  fontWeight: '800',
  color: '$gray12',
})

export const WeekdayText = styled(BaseText, {
  fontWeight: '500',
  color: '$gray10',
})

export const MonthText = styled(BaseText, {
  fontWeight: '600',
  color: '$gray11',
})

export const Divider = styled(XStack, {
  flex: 1,
  height: 1,
  bg: '$gray4',
})

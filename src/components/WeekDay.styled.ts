import { H1, styled, XStack, YStack } from 'tamagui';
import { FALL_STYLE, FALL_STYLE_KEY } from '@/constants/styles';

export const WeekDayContainer = styled(YStack, {
  gap: '$2',
  mb: '$4',
  p: '$4',
  bg: '$gray12',
  rounded: '$8',
  animation: 'medium',
  enterStyle: FALL_STYLE,
  animateOnly: FALL_STYLE_KEY,
});

export const CurrentMonthBox = styled(XStack, {
  justify: 'space-between',
});

export const CurrentMonthText = styled(H1, {
  fontWeight: '800',
  color: '$gray1',
});

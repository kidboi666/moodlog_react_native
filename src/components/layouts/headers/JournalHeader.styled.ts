import { Button, styled, XStack, YStack } from 'tamagui';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { HeaderContainer as HOSHeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { CONTAINER_SPACING } from '@/constants/size';
import { RenderTime } from '@/components/RenderTime';
import { RenderDay } from '@/components/RenderDay';
import { RenderDate } from '@/components/RenderDate';

export const HeaderContainer = styled(HOSHeaderContainer, {
  items: 'center',
  pl: CONTAINER_SPACING,
});

export const DateContainer = styled(YStack, {
  items: 'center',
});

export const TimeText = styled(RenderTime, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DayText = styled(RenderDay, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DateText = styled(RenderDate, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DayWithTimeBox = styled(XStack, {
  gap: '$2',
});

export const BackButton = styled(Button, {
  unstyled: true,
  animation: 'quick',
  rounded: '$4',
  p: '$3',
  scaleIcon: 1.5,
  enterStyle: ENTER_STYLE,
  pressStyle: PRESS_STYLE,
});

export const DeleteButton = styled(Button, {
  unstyled: true,
  animation: 'quick',
  scaleIcon: 1.5,
  rounded: '$4',
  p: '$3',
  enterStyle: ENTER_STYLE,
  pressStyle: PRESS_STYLE,
});

import { Button, styled, View } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

export const DevMenuButton = styled(Button, {
  unstyled: true,
  p: '$2',
  rounded: '$2',
  animation: 'quick',
  animateOnly: PRESS_STYLE_KEY,
  pressStyle: PRESS_STYLE,
});

export const RestLayout = styled(View, {
  flex: 1,
});

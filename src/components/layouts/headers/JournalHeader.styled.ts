import { Button, styled, YStack } from 'tamagui';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { HeaderContainer as HOSHeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { CONTAINER_SPACING } from '@/constants/size';

export const HeaderContainer = styled(HOSHeaderContainer, {
  items: 'center',
  pl: CONTAINER_SPACING,
});

export const BackButton = styled(Button, {
  unstyled: true,
  animation: 'quick',
  rounded: '$4',
  p: '$3',
  enterStyle: ENTER_STYLE,
  pressStyle: PRESS_STYLE,
});

export const DateContainer = styled(YStack, {
  items: 'center',
});

import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';
import { PressableButton } from '@/core/components/shared/PressableButton.styled';
import { styled } from 'tamagui';

export const HeaderContainer = styled(HOSHeaderContainer);

export const BackButton = styled(PressableButton, {
  elevate: false,
  bg: '$backgroundTransparent',
});

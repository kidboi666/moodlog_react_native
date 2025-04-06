import { PressableButton } from '@/core/components/shared/PressableButton.styled';
import { styled, View } from 'tamagui';

export const BackButton = styled(PressableButton, {
  elevate: false,
  bg: '$backgroundTransparent',
});

export const RestBox = styled(View, {
  flex: 1,
});

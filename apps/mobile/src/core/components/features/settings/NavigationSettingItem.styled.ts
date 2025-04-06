import { PressableButton } from '@/core/components/shared/PressableButton.styled';
import { styled, Text } from 'tamagui';

export const SettingsNavigationButton = styled(PressableButton, {
  elevate: false,
  justify: 'flex-start',
  bg: '$background',
  scaleIcon: 1.2,
  size: '$5',
  fontSize: '$6',
});

export const ItemLabel = styled(Text, {
  fontSize: '$5',
  flex: 1,
});

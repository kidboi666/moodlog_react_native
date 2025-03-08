import { Button, styled } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

// The styled navigation button used in settings screens
// Provides consistent styling for all setting navigation items
export const SettingsNavigationButton = styled(Button, {
  unstyled: true,
  animation: 'medium',
  animateOnly: PRESS_STYLE_KEY,
  flexDirection: 'row',
  rounded: '$4',
  gap: '$2',
  fontSize: '$6',
  pressStyle: PRESS_STYLE,
  p: '$5',
});

import { styled, View } from 'tamagui';
import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/constants/styles';

export const FadeInContainer = styled(View, {
  animation: 'medium',
  animateOnly: ENTER_STYLE_KEY,
  enterStyle: ENTER_STYLE,

  variants: {
    isVisible: {
      false: {
        opacity: 0,
      },
    },
  },
});

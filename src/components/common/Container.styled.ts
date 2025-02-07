import { styled } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from '@tamagui/linear-gradient';

export const View = styled(SafeAreaView, {
  bg: '$background',
  height: '100%',
  flex: 1,
});

export const GradientContainer = styled(LinearGradient, {
  colors: ['#E8E2D5', '#FBF8F0'],
  p: '$4',
  pb: '$7',
  start: [0, 0.7],
  end: [0, 0],
  height: '100%',
  flex: 1,
});

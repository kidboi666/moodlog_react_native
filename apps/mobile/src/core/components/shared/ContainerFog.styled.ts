import { Platform } from 'react-native';
import { styled } from 'tamagui';

import { LinearGradient as TamaguiLinearGradient } from 'tamagui/linear-gradient';

export const TopFog = styled(TamaguiLinearGradient, {
  position: 'absolute',
  t: 0,
  l: 0,
  r: 0,
  height: 80,
  z: 100,
  start: [0, 0],
  end: [0, 1],
});

export const BottomFog = styled(TamaguiLinearGradient, {
  position: 'absolute',
  b: Platform.OS === 'ios' ? 94 : 80,
  l: 0,
  r: 0,
  height: 30,
  z: 1,
  start: [0, 0],
  end: [0, 1],
  pointerEvents: 'none',
});

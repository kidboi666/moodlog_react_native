import { defaultConfig } from '@tamagui/config/v4';
import { createFont, createTamagui } from 'tamagui';
import { themes, tokens } from '@tamagui/themes';

const systemFont = createFont({
  family: 'Pretendard',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    4: '400',
    5: '500',
    7: '700',
    8: '800',
  },
  face: {
    400: { normal: 'Pretendard-Regular' },
    500: { normal: 'Pretendard-Medium' },
    700: { normal: 'Pretendard-SemiBold' },
    800: { normal: 'Pretendard-Bold' },
  },
});
//
// const smoothBezierEasing = Easing.bezier(0.215, 0.61, 0.355, 1.0);
//
// const animations = createAnimations({
//   medium: {
//     type: 'timing',
//     duration: 300,
//     easing: Easing.in(Easing.cubic),
//   },
//   quick: {
//     type: 'timing',
//     duration: 400,
//     easing: smoothBezierEasing,
//   },
//   bouncy: {
//     type: 'spring',
//     damping: 10,
//     mass: 0.9,
//     stiffness: 100,
//   },
// });

export const config = createTamagui({
  ...defaultConfig,
  fonts: {
    body: systemFont,
    heading: systemFont,
  },
  themes,
  tokens,
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

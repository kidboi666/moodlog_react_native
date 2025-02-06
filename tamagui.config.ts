import { defaultConfig } from '@tamagui/config/v4';
import { createFont, createTamagui, createTokens } from 'tamagui';
import { darkTheme, lightTheme, palette } from '@/constants/colors';

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: { ...palette } as const,
});

const bodyFont = createFont({
  family: 'goorm Sans',
  face: {
    400: { normal: './assets/fonts/goorm-sans-regular.ttf' },
    500: { normal: './assets/fonts/goorm-sans-medium.ttf' },
    700: { normal: './assets/fonts/goorm-sans-bold.ttf' },
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    5: 32,
    6: 36,
    7: 40,
    8: 44,
  },
  weight: {
    4: '400',
    5: '500',
    7: '700',
  },
  letterSpacing: {
    4: 0, // normal
    8: -1, // tight
  },
});

export const config = createTamagui({
  ...defaultConfig,

  fonts: {
    body: bodyFont,
  },
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

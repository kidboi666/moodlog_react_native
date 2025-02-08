import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, createTokens } from 'tamagui';
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes';

const tokens = createTokens({
  color,
  radius,
  size,
  space,
  zIndex,
  // size: {
  //   ...defaultConfig.tokens.size,
  //   sm: 38,
  //   md: 46,
  //   lg: 60,
  // },
  // space: {
  //   ...defaultConfig.tokens.space,
  //   sm: 15,
  //   md: 20,
  //   lg: 25,
  // },
  // radius: {
  //   ...defaultConfig.tokens.radius,
  //   sm: 4,
  //   md: 8,
  //   lg: 12,
  // },
  // color: { ...palette } as const,
});

export const config = createTamagui({
  ...defaultConfig,
  themes,
  tokens,
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { themes, tokens } from '@tamagui/themes';

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

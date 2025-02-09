import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { themes, tokens } from '@tamagui/themes';
import { createInterFont } from '@tamagui/font-inter';

const headingFont = createInterFont();
const bodyFont = createInterFont();

export const config = createTamagui({
  ...defaultConfig,
  themes,
  tokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

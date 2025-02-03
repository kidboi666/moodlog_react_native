import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, createTokens } from '@tamagui/core';
import { createFont } from 'tamagui';

const tokens = createTokens({
  color: {
    // Grey scale
    grey100: '#F5F5F5',
    grey200: '#EEEEEE',
    grey300: '#E0E0E0',
    grey400: '#BDBDBD',
    grey500: '#9E9E9E',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey900: '#212121',

    // Red palette
    redLight: '#FFCDD2',
    redMain: '#F44336',
    redDark: '#B71C1C',

    // Blue palette
    blueLight: '#E3F2FD',
    blueMain: '#2196F3',
    blueDark: '#1976D2',

    // Green palette
    greenLight: '#E8F5E9',
    greenMain: '#4CAF50',
    greenDark: '#388E3C',

    // Yellow palette
    yellowLight: '#FFFDE7',
    yellowMain: '#FFEB3B',
    yellowDark: '#FBC02D',
  },
});

const bodyFont = createFont({
  family: 'goorm-sans',
  face: {
    300: { normal: require('./src/assets/fonts/goorm-sans-regular.ttf') },
    400: { normal: require('./src/assets/fonts/goorm-sans-medium.ttf') },
    500: { normal: require('./src/assets/fonts/goorm-sans-bold.ttf') },
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
    3: '300', // light
    4: '400', // regular
    5: '500', // medium
  },
  letterSpacing: {
    4: 0, // normal
    8: -1, // tight
  },
});

export const config = createTamagui({
  ...defaultConfig,
  fonts: {
    heading: bodyFont,
    body: bodyFont,
  },
  tokens: {
    ...defaultConfig.tokens,
    color: {
      // Grey scale
      grey100: '#F5F5F5',
      grey200: '#EEEEEE',
      grey300: '#E0E0E0',
      grey400: '#BDBDBD',
      grey500: '#9E9E9E',
      grey600: '#757575',
      grey700: '#616161',
      grey800: '#424242',
      grey900: '#212121',

      // Red palette
      redLight: '#FFCDD2',
      redMain: '#F44336',
      redDark: '#B71C1C',

      // Blue palette
      blueLight: '#E3F2FD',
      blueMain: '#2196F3',
      blueDark: '#1976D2',

      // Green palette
      greenLight: '#E8F5E9',
      greenMain: '#4CAF50',
      greenDark: '#388E3C',

      // Yellow palette
      yellowLight: '#FFFDE7',
      yellowMain: '#FFEB3B',
      yellowDark: '#FBC02D',
    },
  },
  themes: {
    light: {
      // Background colors
      bgPrimary: tokens.color.grey100,
      bgSecondary: tokens.color.grey200,
      bgTertiary: tokens.color.grey300,

      // Text colors
      textPrimary: tokens.color.grey900,
      textSecondary: tokens.color.grey700,
      textTertiary: tokens.color.grey500,
      textPlaceholder: tokens.color.grey400,

      // Button colors
      buttonPrimary: tokens.color.grey800,
      buttonSecondary: tokens.color.grey600,
      buttonTertiary: tokens.color.grey400,
      buttonDisabled: tokens.color.grey300,

      // Button text colors
      buttonTextPrimary: tokens.color.grey100,
      buttonTextSecondary: tokens.color.grey200,
      buttonTextTertiary: tokens.color.grey300,
      buttonTextDisabled: tokens.color.grey400,

      // Common colors
      primary: tokens.color.blueMain,
      secondary: tokens.color.greenMain,
      error: tokens.color.redMain,
      warning: tokens.color.yellowMain,
      info: tokens.color.blueMain,
      success: tokens.color.greenMain,
    },
    dark: {
      // Background colors
      bgPrimary: tokens.color.grey900,
      bgSecondary: tokens.color.grey800,
      bgTertiary: tokens.color.grey700,

      // Text colors
      textPrimary: tokens.color.grey100,
      textSecondary: tokens.color.grey300,
      textTertiary: tokens.color.grey500,
      textPlaceholder: tokens.color.grey800,

      // Button colors
      buttonPrimary: tokens.color.grey200,
      buttonSecondary: tokens.color.grey400,
      buttonTertiary: tokens.color.grey600,
      buttonDisabled: tokens.color.grey800,

      // Button text colors
      buttonTextPrimary: tokens.color.grey900,
      buttonTextSecondary: tokens.color.grey800,
      buttonTextTertiary: tokens.color.grey700,
      buttonTextDisabled: tokens.color.grey600,

      // Common colors
      primary: tokens.color.blueMain,
      secondary: tokens.color.greenMain,
      error: tokens.color.redMain,
      warning: tokens.color.yellowMain,
      info: tokens.color.blueMain,
      success: tokens.color.greenMain,
    },
  },
});

type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

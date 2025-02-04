import { defaultConfig } from '@tamagui/config/v4';
import { createFont, createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    // Grey scale
    beige100: '#FFFFFF',
    beige200: '#FDFCF9',
    beige300: '#FCF9F4',
    beige400: '#FBF8F0',
    beige500: '#E8E2D5',
    beige600: '#C4BAA7',
    beige700: '#998F7C',
    beige800: '#6D6557',
    beige900: '#403C34',

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

    // Red scale
    red100: '#FFE5E7',
    red200: '#FFCCD0',
    red300: '#FFB3B9',
    red400: '#FF9AA2',
    red500: '#FF818B',
    red600: '#FF6874',
    red700: '#FF4F5D',
    red800: '#FF3646',
    red900: '#FF1D2F',

    // Blue scale
    blue100: '#E5F4FF',
    blue200: '#CCE9FF',
    blue300: '#B3DEFF',
    blue400: '#9AD3FF',
    blue500: '#81C8FF',
    blue600: '#68BDFF',
    blue700: '#4FB2FF',
    blue800: '#36A7FF',
    blue900: '#1D9CFF',

    // Green scale
    green100: '#E5FFE7',
    green200: '#CCFFD0',
    green300: '#B3FFB9',
    green400: '#9AFFA2',
    green500: '#81FF8B',
    green600: '#68FF74',
    green700: '#4FFF5D',
    green800: '#36FF46',
    green900: '#1DFF2F',

    // Yellow scale
    yellow100: '#FFFDE5',
    yellow200: '#FFFBCC',
    yellow300: '#FFF9B3',
    yellow400: '#FFF79A',
    yellow500: '#FFF581',
    yellow600: '#FFF368',
    yellow700: '#FFF14F',
    yellow800: '#FFEF36',
    yellow900: '#FFED1D',

    white: '#ffffff',
    black: '#000000',
  } as const,
});

const darkTheme = {
  // Background colors
  bgPrimary: tokens.color.beige900,
  bgSecondary: tokens.color.beige800,
  bgTertiary: tokens.color.beige700,

  // Text colors
  textPrimary: tokens.color.beige100,
  textSecondary: tokens.color.beige300,
  textTertiary: tokens.color.beige500,
  textPlaceholder: tokens.color.beige800,

  // Button colors
  buttonPrimary: tokens.color.beige200,
  buttonSecondary: tokens.color.beige400,
  buttonTertiary: tokens.color.beige600,
  buttonDisabled: tokens.color.beige800,

  // Button text colors
  buttonTextPrimary: tokens.color.beige900,
  buttonTextSecondary: tokens.color.beige800,
  buttonTextTertiary: tokens.color.beige700,
  buttonTextDisabled: tokens.color.beige600,
};

const lightTheme = {
  // Background colors
  bgPrimary: tokens.color.beige400,
  bgSecondary: tokens.color.beige200,
  bgTertiary: tokens.color.beige300,

  // Text colors
  textPrimary: tokens.color.beige900,
  textSecondary: tokens.color.beige700,
  textTertiary: tokens.color.beige500,
  textPlaceholder: tokens.color.beige400,

  // Button colors
  buttonPrimary: tokens.color.beige900,
  buttonSecondary: tokens.color.beige600,
  buttonTertiary: tokens.color.beige400,
  buttonDisabled: tokens.color.beige300,

  // Button text colors
  buttonTextPrimary: tokens.color.beige100,
  buttonTextSecondary: tokens.color.beige200,
  buttonTextTertiary: tokens.color.beige300,
  buttonTextDisabled: tokens.color.beige400,
};

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
  tokens,
  themes: {
    ...defaultConfig.themes,
    light: lightTheme,
    dark: darkTheme,
  },
});

type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

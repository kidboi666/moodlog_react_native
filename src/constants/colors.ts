const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const palette = {
  // Grey scale
  beige100: '#FFFFFF',
  beige200: '#FDFCF9',
  beige300: '#FCF9F4',
  beige400: '#FBF8F0',
  beige500: '#E8E2D5',
  beige600: '#C4BAA7',
  beige700: '#998F7C',
  beige800: '#655e51',
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
};

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const darkTheme = {
  // Backgrounds
  bgPrimary: palette.beige900,
  bgSecondary: palette.beige800,
  bgTertiary: palette.beige700,

  // Texts
  textPrimary: palette.beige200,
  textSecondary: palette.beige500,
  textTertiary: palette.beige600,
  textPlaceholder: palette.beige500,

  // Buttons
  buttonPrimary: palette.beige200,
  buttonSecondary: palette.beige400,
  buttonTertiary: palette.beige600,
  buttonDisabled: palette.beige800,

  // Button texts
  buttonTextPrimary: palette.beige900,
  buttonTextSecondary: palette.beige800,
  buttonTextTertiary: palette.beige700,
  buttonTextDisabled: palette.beige600,

  // Lines
  line: palette.beige800,
} as const;

export const lightTheme = {
  // Backgrounds
  bgPrimary: palette.beige500,
  bgSecondary: palette.beige200,
  bgTertiary: palette.beige300,

  // Texts
  textPrimary: palette.beige900,
  textSecondary: palette.beige800,
  textTertiary: palette.beige600,
  textPlaceholder: palette.beige600,

  // Buttons
  buttonPrimary: palette.beige900,
  buttonSecondary: palette.beige600,
  buttonTertiary: palette.beige400,
  buttonDisabled: palette.beige300,

  // Button texts
  buttonTextPrimary: palette.beige100,
  buttonTextSecondary: palette.beige200,
  buttonTextTertiary: palette.beige300,
  buttonTextDisabled: palette.beige400,

  // Lines
  line: palette.beige600,
} as const;

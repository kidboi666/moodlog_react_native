export const PALETTE = {
  grey: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  red: {
    light: '#FFCDD2',
    dark: '#B71C1C',
    main: '#F44336',
  },
  blue: {
    light: '#E3F2FD',
    dark: '#1976D2',
    main: '#2196F3',
  },
  green: {
    light: '#E8F5E9',
    dark: '#388E3C',
    main: '#4CAF50',
  },
  yellow: {
    light: '#FFFDE7',
    dark: '#FBC02D',
    main: '#FFEB3B',
  },
};

export const COLOR_THEMES = {
  light: {
    background: {
      primary: PALETTE.grey[100],
      secondary: PALETTE.grey[200],
      tertiary: PALETTE.grey[300],
    },
    text: {
      primary: PALETTE.grey[900],
      secondary: PALETTE.grey[700],
      tertiary: PALETTE.grey[500],
      placeholder: PALETTE.grey[400],
    },
    button: {
      primary: PALETTE.grey[800],
      secondary: PALETTE.grey[600],
      tertiary: PALETTE.grey[400],
      disabled: PALETTE.grey[300],
    },
    buttonText: {
      primary: PALETTE.grey[100],
      secondary: PALETTE.grey[200],
      tertiary: PALETTE.grey[300],
      disabled: PALETTE.grey[400],
    },
  },
  dark: {
    background: {
      primary: PALETTE.grey[900],
      secondary: PALETTE.grey[800],
      tertiary: PALETTE.grey[700],
    },
    text: {
      primary: PALETTE.grey[100],
      secondary: PALETTE.grey[300],
      tertiary: PALETTE.grey[500],
      placeholder: PALETTE.grey[800],
    },
    button: {
      primary: PALETTE.grey[200],
      secondary: PALETTE.grey[400],
      tertiary: PALETTE.grey[600],
      disabled: PALETTE.grey[800],
    },
    buttonText: {
      primary: PALETTE.grey[900],
      secondary: PALETTE.grey[800],
      tertiary: PALETTE.grey[700],
      disabled: PALETTE.grey[600],
    },
  },
  common: {
    primary: PALETTE.blue.main,
    secondary: PALETTE.green.main,
    error: PALETTE.red.main,
    warning: PALETTE.yellow.main,
    info: PALETTE.blue.main,
    success: PALETTE.green.main,
  },
};

export const EMOTION_SCHEME = {
  happy: {
    zero: PALETTE.green.light,
    half: PALETTE.green.dark,
    full: PALETTE.green.main,
  },
  sad: {
    zero: PALETTE.blue.light,
    half: PALETTE.blue.dark,
    full: PALETTE.blue.main,
  },
  angry: {
    zero: PALETTE.red.light,
    half: PALETTE.red.dark,
    full: PALETTE.red.main,
  },
  peace: {
    zero: PALETTE.yellow.light,
    half: PALETTE.yellow.dark,
    full: PALETTE.yellow.main,
  },
};

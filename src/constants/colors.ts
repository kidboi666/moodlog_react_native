export const palette = {
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
    main: '#F44336',
    dark: '#B71C1C',
  },
  blue: {
    light: '#E3F2FD',
    main: '#2196F3',
    dark: '#1976D2',
  },
  green: {
    light: '#E8F5E9',
    main: '#4CAF50',
    dark: '#388E3C',
  },
  yellow: {
    light: '#FFFDE7',
    main: '#FFEB3B',
    dark: '#FBC02D',
  },
};

export const COLOR_THEMES = {
  light: {
    background: {
      primary: palette.grey[100],
      secondary: palette.grey[200],
      tertiary: palette.grey[300],
    },
    text: {
      primary: palette.grey[900],
      secondary: palette.grey[800],
      tertiary: palette.grey[700],
      disabled: palette.grey[600],
    },
    button: {
      primary: palette.grey[800],
      secondary: palette.grey[600],
      tertiary: palette.grey[400],
      disabled: palette.grey[300],
    },
    buttonText: {
      primary: palette.grey[100],
      secondary: palette.grey[200],
      tertiary: palette.grey[300],
      disabled: palette.grey[400],
    },
  },
  dark: {
    background: {
      primary: palette.grey[900],
      secondary: palette.grey[800],
      tertiary: palette.grey[700],
    },
    text: {
      primary: palette.grey[100],
      secondary: palette.grey[200],
      tertiary: palette.grey[300],
      disabled: palette.grey[400],
    },
    button: {
      primary: palette.grey[200],
      secondary: palette.grey[400],
      tertiary: palette.grey[600],
      disabled: palette.grey[800],
    },
    buttonText: {
      primary: palette.grey[900],
      secondary: palette.grey[800],
      tertiary: palette.grey[700],
      disabled: palette.grey[600],
    },
  },
  common: {
    primary: palette.blue.main,
    secondary: palette.green.main,
    error: palette.red.main,
    warning: palette.yellow.main,
    info: palette.blue.main,
    success: palette.green.main,
  },
};

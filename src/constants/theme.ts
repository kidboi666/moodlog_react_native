export const colorTokens = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  neutral: {
    0: '#ffffff',
    50: '#fcfcfc',
    100: '#f8f8f8',
    200: '#f3f3f3',
    300: '#ededed',
    400: '#e8e8e8',
    500: '#c7c7c7',
    600: '#8f8f8f',
    700: '#6f6f6f',
    800: '#4a4a4a',
    900: '#2b2b2b',
    950: '#171717',
    1000: '#000000',
  },
  semantic: {
    success: {
      light: '#22c55e',
      main: '#16a34a',
      dark: '#15803d',
      surface: '#f0fdf4',
    },
    error: {
      light: '#ef4444',
      main: '#dc2626',
      dark: '#b91c1c',
      surface: '#fef2f2',
    },
    warning: {
      light: '#f59e0b',
      main: '#d97706',
      dark: '#b45309',
      surface: '#fffbeb',
    },
    info: {
      light: '#3b82f6',
      main: '#2563eb',
      dark: '#1d4ed8',
      surface: '#eff6ff',
    },
  },
  mood: {
    happy: '#FFD700',
    sad: '#4682B4',
    angry: '#FF4500',
    excited: '#FF69B4',
    calm: '#20B2AA',
    tired: '#708090',
    anxious: '#9932CC',
    grateful: '#32CD32',
  },
} as const

export const lightThemeColors = {
  background: {
    primary: colorTokens.neutral[300],
    secondary: colorTokens.neutral[200],
    tertiary: colorTokens.neutral[100],
    inverse: colorTokens.neutral[950],
    pure: colorTokens.neutral[50],
  },
  surface: {
    primary: colorTokens.neutral[0],
    secondary: colorTokens.neutral[50],
    tertiary: colorTokens.neutral[100],
    inverse: colorTokens.neutral[900],
  },
  text: {
    primary: colorTokens.neutral[950],
    secondary: colorTokens.neutral[700],
    tertiary: colorTokens.neutral[600],
    inverse: colorTokens.neutral[0],
    disabled: colorTokens.neutral[400],
  },
  border: {
    primary: colorTokens.neutral[200],
    secondary: colorTokens.neutral[300],
    tertiary: colorTokens.neutral[400],
    focus: colorTokens.neutral[500],
  },
  action: {
    primary: colorTokens.neutral[500],
    secondary: colorTokens.neutral[300],
    hover: colorTokens.neutral[600],
    pressed: colorTokens.neutral[700],
    disabled: colorTokens.neutral[300],
  },
} as const

export const darkThemeColors = {
  background: {
    primary: colorTokens.neutral[700],
    secondary: colorTokens.neutral[800],
    tertiary: colorTokens.neutral[900],
    inverse: colorTokens.neutral[50],
    pure: colorTokens.neutral[950],
  },
  surface: {
    primary: colorTokens.neutral[950],
    secondary: colorTokens.neutral[900],
    tertiary: colorTokens.neutral[800],
    inverse: colorTokens.neutral[100],
  },
  text: {
    primary: colorTokens.neutral[50],
    secondary: colorTokens.neutral[300],
    tertiary: colorTokens.neutral[400],
    inverse: colorTokens.neutral[950],
    disabled: colorTokens.neutral[600],
  },
  border: {
    primary: colorTokens.neutral[800],
    secondary: colorTokens.neutral[700],
    tertiary: colorTokens.neutral[600],
    focus: colorTokens.neutral[400],
  },
  action: {
    primary: colorTokens.neutral[400],
    secondary: colorTokens.neutral[700],
    hover: colorTokens.neutral[300],
    pressed: colorTokens.neutral[200],
    disabled: colorTokens.neutral[700],
  },
} as const

export type ColorTokens = typeof colorTokens
export type ThemeColors = typeof lightThemeColors

// import {
//   DarkTheme as NavigationDarkTheme,
//   DefaultTheme as NavigationDefaultTheme,
// } from '@react-navigation/native'
// import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'
//
// import { baseVariants, customVariants } from '@/configs'
// import configureFonts from 'react-native-paper/src/styles/fonts'
//
// export class ThemeManager {
//   private static instance: ThemeManager
//   private currentTheme: 'light' | 'dark' = 'light'
//
//   private constructor() {}
//
//   static getInstance(): ThemeManager {
//     if (!ThemeManager.instance) {
//       ThemeManager.instance = new ThemeManager()
//     }
//     return ThemeManager.instance
//   }
//
//   setTheme(theme: 'light' | 'dark') {
//     this.currentTheme = theme
//   }
//
//   getCurrentTheme() {
//     return this.currentTheme
//   }
//
//   getColors() {
//     return this.currentTheme === 'light' ? lightThemeColors : darkThemeColors
//   }
//
//   getColorTokens() {
//     return colorTokens
//   }
//
//   getNavigationTheme() {
//     const colors = this.getColors()
//     const baseTheme =
//       this.currentTheme === 'light'
//         ? NavigationDefaultTheme
//         : NavigationDarkTheme
//
//     return {
//       ...baseTheme,
//       colors: {
//         ...baseTheme.colors,
//         primary: colors.action.primary,
//         background: colors.background.primary,
//         card: colors.surface.primary,
//         text: colors.text.primary,
//         border: colors.border.primary,
//         notification: colorTokens.semantic.error.main,
//       },
//     }
//   }
//
//   getPaperTheme() {
//     const colors = this.getColors()
//     const tokens = this.getColorTokens()
//     const baseTheme =
//       this.currentTheme === 'light' ? MD3LightTheme : MD3DarkTheme
//     return {
//       ...baseTheme,
//       roundness: 8,
//       fonts: configureFonts({
//         config: {
//           ...baseVariants,
//           ...customVariants,
//         },
//       }),
//       colors: {
//         ...baseTheme.colors,
//
//         /**
//          * Primary 색상
//          */
//         primary: colors.action.primary,
//         onPrimary: colors.text.inverse,
//         primaryContainer: colors.background.secondary,
//         onPrimaryContainer: colors.text.primary,
//
//         /**
//          * Secondary 색상
//          */
//         secondary: colors.action.secondary,
//         onSecondary: colors.text.primary,
//         secondaryContainer: colors.background.tertiary,
//         onSecondaryContainer: colors.text.primary,
//
//         /**
//          * Tertiary 색상
//          */
//         tertiary: tokens.neutral[500],
//         onTertiary: colors.text.inverse,
//         tertiaryContainer: colors.background.tertiary,
//         onTertiaryContainer: colors.text.primary,
//
//         /**
//          * Neutral 색상
//          */
//         background: colors.background.primary,
//         onBackground: colors.text.primary,
//         surface: colors.surface.primary,
//         onSurface: colors.text.primary,
//
//         /**
//          * Neutral Variant 색상
//          */
//         surfaceVariant: colors.surface.secondary,
//         onSurfaceVariant: colors.text.secondary,
//         outline: colors.border.primary,
//         outlineVariant: colors.border.secondary,
//
//         /**
//          * Error 색상
//          */
//         error: tokens.semantic.error.main,
//         onError: colors.text.inverse,
//         errorContainer: tokens.semantic.error.surface,
//         onErrorContainer: tokens.semantic.error.dark,
//
//         /**
//          * Elevation 색상
//          */
//         elevation: {
//           ...baseTheme.colors.elevation,
//         },
//
//         /**
//          * Disabled State 색상
//          */
//         surfaceDisabled: colors.background.secondary,
//         onSurfaceDisabled: colors.text.disabled,
//       },
//     }
//   }
//
//   withOpacity(color: string, opacity: number): string {
//     if (color.startsWith('rgba')) {
//       return color.replace(/[\d.]+\)$/g, `${opacity})`)
//     }
//
//     if (color.startsWith('#')) {
//       return this.hexToRgba(color, opacity)
//     }
//
//     return color
//   }
//
//   hexToRgba(hex: string, alpha: number): string {
//     const hexValue = hex.startsWith('#') ? hex.slice(1) : hex
//     const r = Number.parseInt(hexValue.substring(0, 2), 16)
//     const g = Number.parseInt(hexValue.substring(2, 4), 16)
//     const b = Number.parseInt(hexValue.substring(4, 6), 16)
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`
//   }
//
//   isColorDark(color: string): boolean {
//     const hex = color.replace('#', '')
//     const r = Number.parseInt(hex.substring(0, 2), 16)
//     const g = Number.parseInt(hex.substring(2, 2), 16)
//     const b = Number.parseInt(hex.substring(4, 2), 16)
//
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000
//     return brightness < 128
//   }
//
//   getTextColor(backgroundColor: string): string {
//     return this.isColorDark(backgroundColor)
//       ? colorTokens.neutral[0]
//       : colorTokens.neutral[950]
//   }
// }
//
// export const themeManager = ThemeManager.getInstance()

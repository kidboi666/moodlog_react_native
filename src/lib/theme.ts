import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

import { colorTokens, darkThemeColors, lightThemeColors } from '@/constants'

export class ThemeManager {
  private static instance: ThemeManager
  private currentTheme: 'light' | 'dark' = 'light'

  private constructor() {}

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme
  }

  getCurrentTheme() {
    return this.currentTheme
  }

  getColors() {
    return this.currentTheme === 'light' ? lightThemeColors : darkThemeColors
  }

  getColorTokens() {
    return colorTokens
  }

  getNavigationTheme() {
    const colors = this.getColors()
    const baseTheme =
      this.currentTheme === 'light'
        ? NavigationDefaultTheme
        : NavigationDarkTheme

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.action.primary,
        background: colors.background.pure,
        card: colors.surface.primary,
        text: colors.text.primary,
        border: colors.border.primary,
        notification: colorTokens.semantic.error.main,
      },
    }
  }

  getPaperTheme() {
    const colors = this.getColors()
    const tokens = this.getColorTokens()
    const baseTheme =
      this.currentTheme === 'light' ? MD3LightTheme : MD3DarkTheme

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.action.primary,
        onPrimary: colors.text.inverse,
        primaryContainer: colors.background.secondary,
        onPrimaryContainer: colors.text.primary,
        secondary: colors.action.secondary,
        onSecondary: colors.text.primary,
        secondaryContainer: colors.background.tertiary,
        onSecondaryContainer: colors.text.primary,
        tertiary: tokens.neutral[500],
        onTertiary: colors.text.inverse,
        tertiaryContainer: colors.background.tertiary,
        onTertiaryContainer: colors.text.primary,
        error: tokens.semantic.error.main,
        onError: colors.text.inverse,
        errorContainer: tokens.semantic.error.surface,
        onErrorContainer: tokens.semantic.error.dark,
        background: colors.background.primary,
        onBackground: colors.text.primary,
        surface: colors.surface.primary,
        onSurface: colors.text.primary,
        surfaceVariant: colors.surface.secondary,
        onSurfaceVariant: colors.text.secondary,
        outline: colors.border.primary,
        outlineVariant: colors.border.secondary,
        shadow: tokens.neutral[1000],
        scrim: tokens.neutral[1000],
        inverseSurface: colors.surface.inverse,
        inverseOnSurface: colors.text.inverse,
        inversePrimary: colors.action.primary,
        elevation: {
          level0: 'transparent',
          level1: colors.background.pure,
          level2: colors.surface.secondary,
          level3: colors.surface.tertiary,
          level4: colors.background.tertiary,
          level5: colors.surface.tertiary,
        },
        surfaceDisabled: this.withOpacity(colors.text.primary, 0.12),
        onSurfaceDisabled: this.withOpacity(colors.text.primary, 0.38),
        backdrop: this.withOpacity(tokens.neutral[500], 0.4),
      },
    }
  }

  getAppStyles() {
    const colors = this.getColors()
    return {
      backgroundPrimary: colors.background.primary,
      backgroundSecondary: colors.background.secondary,
      backgroundTertiary: colors.background.tertiary,
      backgroundElevated: colors.background.pure,

      textPrimary: colors.text.primary,
      textSecondary: colors.text.secondary,
      textTertiary: colors.text.tertiary,
      textInverse: colors.text.inverse,
      textDisabled: colors.text.disabled,

      borderPrimary: colors.border.primary,
      borderSecondary: colors.border.secondary,
      borderFocus: colors.border.focus,

      actionPrimary: colors.action.primary,
      actionSecondary: colors.action.secondary,
      actionHover: colors.action.hover,
      actionPressed: colors.action.pressed,
      actionDisabled: colors.action.disabled,

      surfacePrimary: colors.surface.primary,
      surfaceSecondary: colors.surface.secondary,
      surfaceInverse: colors.surface.inverse,
      surfaceTertiary: colors.surface.tertiary,

      success: colorTokens.semantic.success.main,
      error: colorTokens.semantic.error.main,
      warning: colorTokens.semantic.warning.main,
      info: colorTokens.semantic.info.main,
    }
  }

  withOpacity(color: string, opacity: number): string {
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/g, `${opacity})`)
    }

    if (color.startsWith('#')) {
      return this.hexToRgba(color, opacity)
    }

    return color
  }

  hexToRgba(hex: string, alpha: number): string {
    const hexValue = hex.startsWith('#') ? hex.slice(1) : hex
    const r = Number.parseInt(hexValue.substring(0, 2), 16)
    const g = Number.parseInt(hexValue.substring(2, 4), 16)
    const b = Number.parseInt(hexValue.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  isColorDark(color: string): boolean {
    const hex = color.replace('#', '')
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)

    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness < 128
  }

  getTextColor(backgroundColor: string): string {
    return this.isColorDark(backgroundColor)
      ? colorTokens.neutral[0]
      : colorTokens.neutral[950]
  }
}

export const themeManager = ThemeManager.getInstance()
export const useThemeColors = () => themeManager.getColors()
export const useColorTokens = () => themeManager.getColorTokens()
export const useAppStyles = () => themeManager.getAppStyles()

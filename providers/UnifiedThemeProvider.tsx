import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React, { PropsWithChildren, useEffect } from 'react'
import { Platform, useColorScheme } from 'react-native'
import {
  ActivityIndicator,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper'

import { baseFontVariants, customFontVariants } from '@/configs'
import { Colors } from '@/constants'
import { useAppTheme } from '@/store'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'

export function UnifiedThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const { initialize, updateSystemTheme, isInitialized, resolvedTheme } =
    useAppTheme()
  const { theme } = useMaterial3Theme({ sourceColor: Colors.mood.angry })

  const fontConfig = configureFonts({
    config: {
      ...baseFontVariants,
      ...customFontVariants,
    },
  })
  const themeConfig =
    resolvedTheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light }
  const paperTheme = {
    ...themeConfig,
    fonts: fontConfig,
    roundness: 8,
  }
  const navigationTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme
  const statusBarStyle = resolvedTheme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const systemTheme = colorScheme === 'dark' ? 'dark' : 'light'
    if (!isInitialized) {
      initialize(systemTheme)
    } else {
      updateSystemTheme(systemTheme)
    }
  }, [colorScheme, isInitialized])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setStyle(resolvedTheme === 'dark' ? 'light' : 'dark')
      NavigationBar.setVisibilityAsync('hidden')
    }
  }, [resolvedTheme])

  if (!isInitialized) {
    return <ActivityIndicator />
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
      <StatusBar style={statusBarStyle} translucent />
    </PaperProvider>
  )
}

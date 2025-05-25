import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React, { PropsWithChildren, useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import {
  ActivityIndicator,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper'

import { baseVariants, customVariants } from '@/configs'
import { useAppTheme } from '@/store'

export function UnifiedThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const { initialize, updateSystemTheme, isInitialized, resolvedTheme } =
    useAppTheme()
  const fontConfig = configureFonts({
    config: {
      ...baseVariants,
      ...customVariants,
    },
  })
  const themeConfig = resolvedTheme === 'dark' ? MD3DarkTheme : MD3LightTheme
  const paperTheme = {
    ...themeConfig,
    fonts: fontConfig,
    roundness: 16,
  }
  const navigationTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme
  const statusBarStyle =
    resolvedTheme === 'dark' ? 'light-content' : 'dark-content'
  const statusBarColor =
    resolvedTheme === 'dark'
      ? MD3DarkTheme.colors.background
      : MD3LightTheme.colors.background

  useEffect(() => {
    const systemTheme = colorScheme === 'dark' ? 'dark' : 'light'
    if (!isInitialized) {
      initialize(systemTheme)
    } else {
      updateSystemTheme(systemTheme)
    }
  }, [colorScheme, isInitialized])

  if (!isInitialized) {
    return <ActivityIndicator />
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarColor} />
        {children}
      </ThemeProvider>
    </PaperProvider>
  )
}

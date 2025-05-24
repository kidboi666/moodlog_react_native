import { baseVariants, customVariants } from '@/configs'
import { useAppTheme } from '@/store'
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
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={
            colorScheme === 'dark'
              ? MD3DarkTheme.colors.background
              : MD3LightTheme.colors.background
          }
        />
        {children}
      </ThemeProvider>
    </PaperProvider>
  )
}

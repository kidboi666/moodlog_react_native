import { ThemeProvider } from '@react-navigation/native'
import React, { PropsWithChildren, useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { themeManager } from '@/lib'

export function UnifiedThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()

  useEffect(() => {
    themeManager.setTheme(colorScheme === 'dark' ? 'dark' : 'light')
  }, [colorScheme])

  const navigationTheme = themeManager.getNavigationTheme()
  const paperTheme = themeManager.getPaperTheme()
  const isDark = themeManager.getCurrentTheme() === 'dark'

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={navigationTheme.colors.background}
        />
        {children}
      </ThemeProvider>
    </PaperProvider>
  )
}

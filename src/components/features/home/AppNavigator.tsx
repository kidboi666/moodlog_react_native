import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { BottomSheet } from '@/components/features/modal'
import { StatusBar } from '@/components/shared'
import { useAppTheme } from '@/store'
import { MainStack } from './MainStack'

export function AppNavigator() {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()

  // Handle Android navigation bar
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      )
    }
  }, [resolvedTheme])

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ThemeProvider
        value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StatusBar resolvedTheme={resolvedTheme} />
        <MainStack />
        <BottomSheet />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

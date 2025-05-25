import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { BottomSheet } from '@/components/features/sheet'
import { useAppTheme } from '@/store'
import { useSegments } from 'expo-router'
import { MainStack } from './MainStack'

const LEVEL2_ROUTES = ['entries', 'home', 'setting']

export function AppNavigator() {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()
  const segments = useSegments()

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'dark' : 'light',
      )
    }
  }, [resolvedTheme, theme])

  useEffect(() => {
    if (Platform.OS === 'android') {
      segments.find(segment => LEVEL2_ROUTES.includes(segment))
        ? NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2)
        : NavigationBar.setBackgroundColorAsync(theme.colors.background)
    }
  }, [segments])

  return (
    <GestureHandlerRootView style={styles.container}>
      <MainStack />
      <BottomSheet />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

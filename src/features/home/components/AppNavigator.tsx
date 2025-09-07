import * as NavigationBar from 'expo-navigation-bar'
import { useSegments } from 'expo-router'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { useAppTheme } from '@/src/data/store'
import { BottomSheet } from '@/src/features/sheet'
import { MainStack } from './MainStack'

const TRANSPARENT_ROUTES = ['write', 'journal']

export function AppNavigator() {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()
  const segments = useSegments()

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      )
    }
  }, [resolvedTheme, theme])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.colors.background)
    }
  }, [resolvedTheme])

  useEffect(() => {
    if (Platform.OS === 'android') {
      segments.find(segment => TRANSPARENT_ROUTES.includes(segment))
        ? NavigationBar.setBackgroundColorAsync(theme.colors.background)
        : NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2)
    }
  }, [segments, resolvedTheme])

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

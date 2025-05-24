import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { BottomSheet } from '@/components/features/modal'
import { useAppTheme } from '@/store'
import { MainStack } from './MainStack'

export function AppNavigator() {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'dark' : 'light',
      )
      NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2)
    }
  }, [resolvedTheme, theme])

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

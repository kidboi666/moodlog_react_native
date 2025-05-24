import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import '@/lib/i18n'

import { AppNavigator } from '@/components/features/home'
import { useAuthListener, useFontLoader } from '@/hooks'
import { RootProvider } from '@/providers'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { fontLoaded, fontError } = useFontLoader()
  useAuthListener()

  if (!fontLoaded && !fontError) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

import * as SplashScreen from 'expo-splash-screen'
import '@/lib/i18n'
import 'react-native-get-random-values'

import { AppNavigator } from '@/components/features/home'
import { useAuthListener, useFontLoader } from '@/hooks'
import { RootProvider } from '@/providers'
import { useEffect } from 'react'
import { seedDatabase } from '../../db/seed'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { fontLoaded, fontError } = useFontLoader()
  useAuthListener()
  // Wait for fonts to load
  useEffect(() => {
    seedDatabase()
  }, [])

  if (!fontLoaded && !fontError) {
    return null
  }
  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  )
}

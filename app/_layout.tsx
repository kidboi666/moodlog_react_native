import * as SplashScreen from 'expo-splash-screen'

import { AppNavigator } from '@/features/home/components'
import { useAuthListener, useFontLoader } from '@/features/home/hooks'
import '@/lib/i18n'
import { RootProvider } from '@/providers'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { fontLoaded, fontError } = useFontLoader()
  useAuthListener()

  // Wait for fonts to load
  if (!fontLoaded && !fontError) {
    return null
  }

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  )
}

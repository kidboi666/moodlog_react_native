import * as SplashScreen from 'expo-splash-screen'

import { RootProvider } from '@/providers'
import '@/lib/i18n'
import { AppNavigator } from '@/features/home/components'
import { useAuthListener, useFontLoader } from '@/features/home/hooks'

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

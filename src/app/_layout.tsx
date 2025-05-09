import * as SplashScreen from 'expo-splash-screen'

import { AppNavigator } from '@/components/features/home'
import '@/lib/i18n'
import { useAuthListener, useFontLoader } from '@/hooks'
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

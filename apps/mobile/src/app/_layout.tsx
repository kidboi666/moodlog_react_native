import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'tamagui'

import { BottomSheet } from '@/core/components/modals/BottomSheet'
import { StatusBar } from '@/core/components/shared/StatusBar'
import { RootProvider } from '@/core/providers/RootProvider'
import { useAuth } from '@/core/store/auth.store'
import { useAppTheme } from '@/core/store/theme.store'

import '@/lib/i18n/index.js'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    'Pretendard-Medium': require('../../assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Regular': require('../../assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-SemiBold': require('../../assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Bold': require('../../assets/fonts/Pretendard-Bold.ttf'),
    'NanumPenScript-Regular': require('../../assets/fonts/NanumPenScript-Regular.ttf'),
    'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono-Medium': require('../../assets/fonts/RobotoMono-Medium.ttf'),
    'RobotoMono-SemiBold': require('../../assets/fonts/RobotoMono-SemiBold.ttf'),
    'RobotoMono-Bold': require('../../assets/fonts/RobotoMono-Bold.ttf'),
    'Inter-Regular': require('@tamagui/font-inter/otf/Inter-Regular.otf'),
    'Inter-Medium': require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    'Inter-Bold': require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    'Inter-SemiBold': require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
  })
  const isAuthenticated = useAuth(state => state.isAuthenticated)

  // 폰트 로딩 상태 및 오류 로깅
  useEffect(() => {
    if (fontError) {
      console.error('폰트 로딩 오류:', fontError)
    }
    if (fontLoaded) {
      console.log('모든 폰트가 성공적으로 로드되었습니다.')
    }
  }, [fontLoaded, fontError])

  // Handle splash screen
  useEffect(() => {
    async function hideSplashScreen() {
      try {
        if (fontLoaded || fontError) {
          await SplashScreen.hideAsync()
        }
      } catch (err) {
        console.warn('Error hiding splash screen:', err)
      }
    }
    hideSplashScreen()
  }, [fontLoaded, fontError])

  // Wait for fonts to load
  if (!fontLoaded && !fontError) {
    return null
  }

  return (
    <RootProvider>
      <RootLayoutNav isAuthenticated={isAuthenticated} />
    </RootProvider>
  )
}

type RootLayoutNavProps = {
  isAuthenticated: boolean
}

const RootLayoutNav = ({ isAuthenticated }: RootLayoutNavProps) => {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()

  // Background style based on theme
  const backgroundStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: theme.background.val,
    }),
    [theme.background.val, resolvedTheme],
  )

  // Screen options for all routes
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      contentStyle: backgroundStyle,
      headerStyle: backgroundStyle,
    }),
    [backgroundStyle],
  )

  // Handle Android navigation bar
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      )
    }
  }, [resolvedTheme])

  return (
    <GestureHandlerRootView style={backgroundStyle}>
      <ThemeProvider
        value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StatusBar resolvedTheme={resolvedTheme} />
        {isAuthenticated ? (
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name='(tabs)' />
            <Stack.Screen
              name='write'
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen name='+not-found' />
          </Stack>
        ) : (
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name='(onboarding)' />
          </Stack>
        )}
        <BottomSheet />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

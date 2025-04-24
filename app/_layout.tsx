import { supabase } from '@/lib/supabase'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'tamagui'

import '@/locales'
import { useApp, useAppTheme, useAuth } from '@/store'

import { BottomSheet } from '@/features/modal/components'
import { RootProvider } from '@/providers/RootProvider'
import { FullScreenSpinner, StatusBar } from '@/shared/components'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const fontsToLoad = {
  'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.ttf'),
  'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.ttf'),
  'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.ttf'),
  'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
  'NanumPenScript-Regular': require('../assets/fonts/NanumPenScript-Regular.ttf'),
  'RobotoMono-Regular': require('../assets/fonts/RobotoMono-Regular.ttf'),
  'RobotoMono-Medium': require('../assets/fonts/RobotoMono-Medium.ttf'),
  'RobotoMono-SemiBold': require('../assets/fonts/RobotoMono-SemiBold.ttf'),
  'RobotoMono-Bold': require('../assets/fonts/RobotoMono-Bold.ttf'),
  'Esamanru-Light': require('../assets/fonts/Esamanru-Light.otf'),
  'Esamanru-Medium': require('../assets/fonts/Esamanru-Medium.otf'),
  'Esamanru-Bold': require('../assets/fonts/Esamanru-Bold.otf'),
  'LeeSeoyun-Regular': require('../assets/fonts/LeeSeoyun-Regular.ttf'),
  'Inter-Regular': require('@tamagui/font-inter/otf/Inter-Regular.otf'),
  'Inter-Medium': require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  'Inter-Bold': require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  'Inter-SemiBold': require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
}

const useFontLoader = () => {
  const [fontLoaded, fontError] = useFonts(fontsToLoad)

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

  return { fontLoaded, fontError }
}

const useAuthListener = () => {
  const setSession = useAuth(state => state.setSession)
  const clearSession = useAuth(state => state.clearSession)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        clearSession()
      } else if (session) {
        console.log('session', session.user.id)
        setSession(session)
      }
    })
    return () => subscription.unsubscribe()
  }, [setSession, clearSession])
}

const MainStack = () => {
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const theme = useTheme()

  const backgroundStyle = {
    flex: 1,
    backgroundColor: theme.background.val,
  }

  const screenOptions = {
    headerShown: false,
    contentStyle: backgroundStyle,
    headerStyle: backgroundStyle,
  }

  return firstLaunchDate ? (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(write)' />
      <Stack.Screen name='+not-found' />
    </Stack>
  ) : (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='(onboarding)' />
    </Stack>
  )
}

const AppNavigator = () => {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()

  // Background style based on theme
  const backgroundStyle = {
    flex: 1,
    backgroundColor: theme.background.val,
  }

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
        <MainStack />
        <FullScreenSpinner size='large' />
        <BottomSheet />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

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

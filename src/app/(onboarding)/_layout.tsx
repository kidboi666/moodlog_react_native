import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'react-native-paper'

import { StepDot } from '@/components/shared'
import { StepProgressProvider } from '@/providers'
import { useAppTheme } from '@/store'

export default function OnboardingLayout() {
  const { resolvedTheme } = useAppTheme()
  const theme = useTheme()

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.colors.background)
    }
  }, [resolvedTheme])

  return (
    <StepProgressProvider totalSteps={3}>
      <Stack
        screenOptions={{
          headerTitle: () => <StepDot />,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitleAlign: 'center',
          animation: 'fade',
          gestureEnabled: false,
          headerStyle: { backgroundColor: theme.colors.background },
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name='intro' />
        <Stack.Screen name='nickname' />
        <Stack.Screen name='login' />
      </Stack>
    </StepProgressProvider>
  )
}

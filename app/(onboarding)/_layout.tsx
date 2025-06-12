import { Redirect, Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { StepDot } from '@/components/shared'
import { StepProgressProvider } from '@/providers'

export default function OnboardingLayout() {
  const { colors } = useTheme()

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
          headerStyle: { backgroundColor: colors.background },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='nickname' />
        <Stack.Screen name='personality' />
      </Stack>
    </StepProgressProvider>
  )
}

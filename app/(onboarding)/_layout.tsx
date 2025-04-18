import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

import { OnboardingHeader } from '@/components/features/onboarding/OnboardingHeader'
import { StepProgressProvider } from '@/providers/StepProgressProvider'

export default function Layout() {
  const theme = useTheme()

  return (
    <StepProgressProvider totalSteps={4}>
      <Stack
        initialRouteName='welcome'
        screenOptions={{
          headerShown: true,
          header: () => <OnboardingHeader />,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name='welcome' />
        <Stack.Screen name='nickname' />
        <Stack.Screen name='emotion-type' />
        <Stack.Screen name='benefit' />
      </Stack>
    </StepProgressProvider>
  )
}

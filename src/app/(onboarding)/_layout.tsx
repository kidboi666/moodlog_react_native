import { Stack } from 'expo-router'

import { HeaderContent, StepDot } from '@/components/shared'
import { useColors } from '@/hooks'
import { StepProgressProvider } from '@/providers'

export default function Layout() {
  const { colors } = useColors()
  return (
    <StepProgressProvider totalSteps={5}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => (
            <HeaderContent>
              <StepDot />
            </HeaderContent>
          ),
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name='intro' />
        <Stack.Screen name='features' />
        <Stack.Screen name='howto' />
        <Stack.Screen name='nickname' />
        <Stack.Screen name='login' />
      </Stack>
    </StepProgressProvider>
  )
}

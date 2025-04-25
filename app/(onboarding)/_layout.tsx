import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

import { StepProgressProvider } from '@/providers'
import { HeaderContent, StepDot } from '@/shared/components'

export default function Layout() {
  const theme = useTheme()

  return (
    <StepProgressProvider totalSteps={3}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => (
            <HeaderContent>
              <StepDot />
            </HeaderContent>
          ),
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name='welcome' />
        <Stack.Screen name='nickname' />
        <Stack.Screen name='benefit' />
      </Stack>
    </StepProgressProvider>
  )
}

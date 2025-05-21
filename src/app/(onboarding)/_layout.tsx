import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { HeaderContent, StepDot } from '@/components/shared'
import { StepProgressProvider } from '@/providers'

export default function Layout() {
  const theme = useTheme()

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
            backgroundColor: theme.colors.background,
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

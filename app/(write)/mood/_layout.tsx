import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

import { StepProgressProvider } from '@/providers'

export default function WriteMoodLayout() {
  const theme = useTheme()

  return (
    <StepProgressProvider totalSteps={2}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </StepProgressProvider>
  )
}

import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

import { StepProgressProvider } from '@/providers'

export default function WriteJournalLayout() {
  const theme = useTheme()

  return (
    <StepProgressProvider totalSteps={3}>
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

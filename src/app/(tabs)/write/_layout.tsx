import { Stack } from 'expo-router'

import { BackButton } from '@/components/shared'
import { StepProgressProvider } from '@/providers'
import { useTheme } from 'react-native-paper'

export default function WriteJournalLayout() {
  const theme = useTheme()

  return (
    <StepProgressProvider totalSteps={3}>
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton />,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </StepProgressProvider>
  )
}

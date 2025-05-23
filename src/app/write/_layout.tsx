import { Stack } from 'expo-router'

import { BackButton } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
import { StepProgressProvider } from '@/providers'

export default function WriteJournalLayout() {
  const themedStyles = useThemedStyles(({ colors }) => ({
    content: {
      backgroundColor: colors.background.pure,
    },
  }))
  return (
    <StepProgressProvider totalSteps={3}>
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton />,
          contentStyle: themedStyles.content,
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </StepProgressProvider>
  )
}

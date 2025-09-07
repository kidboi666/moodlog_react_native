import { Stack, useRouter } from 'expo-router'
import { IconButton, useTheme } from 'react-native-paper'

import { StepDot } from '@/src/components/shared'
import { StepProgressProvider } from '@/src/providers'
import { useAddJournal } from '@/src/queries'
import { useDraft } from '@/src/store'

export default function WriteLayout() {
  const router = useRouter()
  const theme = useTheme()
  const { draft, resetDraft } = useDraft()

  const { mutate: onSubmit } = useAddJournal()

  const handleSubmit = () => {
    onSubmit(draft)
    resetDraft()
  }

  return (
    <StepProgressProvider totalSteps={2}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          gestureEnabled: false,
          animation: 'flip',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleAlign: 'center',
          headerTitle: () => <StepDot />,
          headerLeft: () => (
            <IconButton icon='arrow-left' onPress={() => router.back()} />
          ),
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen
          name='journal'
          options={{
            headerRight: () => (
              <IconButton icon='send' onPress={handleSubmit} />
            ),
          }}
        />
      </Stack>
    </StepProgressProvider>
  )
}

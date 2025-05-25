import { Stack, useRouter } from 'expo-router'
import { IconButton, useTheme } from 'react-native-paper'

import { StepDot } from '@/components/shared'
import { StepProgressProvider } from '@/providers'

export default function WriteLayout() {
  const router = useRouter()
  const theme = useTheme()
  return (
    <StepProgressProvider totalSteps={2}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          gestureEnabled: false,
          animation: 'fade',
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
        <Stack.Screen name='journal' />
      </Stack>
    </StepProgressProvider>
  )
}

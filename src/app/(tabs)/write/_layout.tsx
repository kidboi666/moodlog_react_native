import { Stack, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { IconButton, useTheme } from 'react-native-paper'

import { StepDot } from '@/components/shared'
import { StepProgressProvider } from '@/providers'

export default function WriteLayout() {
  const { t } = useTranslation()
  const router = useRouter()
  const theme = useTheme()
  return (
    <StepProgressProvider totalSteps={2}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.background },
          gestureEnabled: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.background },
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

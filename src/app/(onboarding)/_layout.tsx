import { Stack } from 'expo-router'

import { StepDot } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
import { StepProgressProvider } from '@/providers'

export default function Layout() {
  const themedStyles = useThemedStyles(({ colors }) => ({
    content: {
      backgroundColor: colors.background.primary,
    },
    header: {
      backgroundColor: colors.background.primary,
    },
  }))
  return (
    <StepProgressProvider totalSteps={5}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: themedStyles.header,
          headerTitle: () => <StepDot />,
          headerTitleAlign: 'center',
          contentStyle: themedStyles.content,
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

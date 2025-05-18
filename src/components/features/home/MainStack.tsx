import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export function MainStack() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: theme.background.val },
        headerStyle: { backgroundColor: theme.background.val },
      }}
    >
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(write)' />
      <Stack.Screen name='(onboarding)' />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}

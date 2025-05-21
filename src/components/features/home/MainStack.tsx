import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'

export function MainStack() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(write)' />
      <Stack.Screen name='(onboarding)' />
      <Stack.Screen name='journal' />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}

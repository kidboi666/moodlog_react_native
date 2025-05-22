import { useColors } from '@/hooks'
import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'

export function MainStack() {
  const { colors } = useColors()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: colors.background.pure },
        headerStyle: { backgroundColor: colors.background.pure },
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

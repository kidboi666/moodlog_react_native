import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function Layout() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background.val },
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='theme' />
      <Stack.Screen name='language' />
      <Stack.Screen name='time_format' />
      <Stack.Screen name='font_size' />
      <Stack.Screen name='profile' />
      <Stack.Screen name='bug_report' />
      <Stack.Screen name='qna' />
    </Stack>
  )
}

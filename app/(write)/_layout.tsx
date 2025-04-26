import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function WriteLayout() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='create_mood' />
      <Stack.Screen name='write_diary' />
    </Stack>
  )
}

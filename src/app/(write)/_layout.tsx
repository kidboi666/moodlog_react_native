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
      <Stack.Screen name='journal' />
      <Stack.Screen name='mood' />
    </Stack>
  )
}

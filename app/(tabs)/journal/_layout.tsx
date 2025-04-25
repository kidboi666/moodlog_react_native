import { Stack, useRouter } from 'expo-router'
import { useTheme } from 'tamagui'

export default function Layout() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='[journalId]' />
    </Stack>
  )
}

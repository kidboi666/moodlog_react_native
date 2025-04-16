import { useDraft } from '@/core/store/draft.store'
import { Redirect, Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function Layout() {
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
      <Stack.Screen name='writing_page' />
    </Stack>
  )
}

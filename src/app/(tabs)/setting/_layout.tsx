import { Stack, useRouter } from 'expo-router'
import { useTheme } from 'tamagui'

import { HeaderContent } from '@/components/shared'

export default function SettingsLayout() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <HeaderContent leftAction={() => router.back()} />,
        contentStyle: { backgroundColor: theme.background.val },
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
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

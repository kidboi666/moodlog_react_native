import { HeaderContent } from '@/components/shared'
import { X } from '@tamagui/lucide-icons'
import { Stack, useRouter } from 'expo-router'
import { useTheme } from 'tamagui'

export default function WriteLayout() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => (
          <HeaderContent
            rightAction={() => router.back()}
            rightActionIcon={X}
          />
        ),
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

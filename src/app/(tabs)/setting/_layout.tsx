import { Stack, useRouter } from 'expo-router'
import { IconButton } from 'react-native-paper'

import { useColors } from '@/hooks'

export default function SettingsLayout() {
  const { colors } = useColors()
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <IconButton
            mode='contained'
            icon='arrow-left'
            onPress={() => router.back()}
          />
        ),
        contentStyle: { backgroundColor: colors.background.pure },
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

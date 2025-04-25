import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export const MainStack = () => {
  const theme = useTheme()

  const screenOptions = {
    headerShown: false,
    contentStyle: { flex: 1, backgroundColor: theme.background.val },
    headerStyle: { backgroundColor: theme.background.val },
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(write)' />
      <Stack.Screen name='(onboarding)' />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}

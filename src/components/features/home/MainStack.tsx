import { Stack } from 'expo-router'

export function MainStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='(onboarding)' />
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='journal' />
      <Stack.Screen name='write' />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}

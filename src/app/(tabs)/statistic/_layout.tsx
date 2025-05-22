import { Stack } from 'expo-router'

import { useColors } from '@/hooks'

export default function StatisticsLayout() {
  const { colors } = useColors()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background.pure,
        },
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

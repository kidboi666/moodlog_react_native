import { Stack, useRouter } from 'expo-router'
import { useLayoutEffect } from 'react'
import { IconButton, useTheme } from 'react-native-paper'

import { H3 } from '@/components/shared'
import { useCalendar } from '@/hooks'
import { convertMonthString } from '@/utils'

export default function EntriesLayout() {
  const router = useRouter()
  const theme = useTheme()
  const { selectedMonth, onSelectedMonthChange } = useCalendar()

  const handlePress = (prevOrNext: 'prev' | 'next') => {
    const monthString = convertMonthString(selectedMonth, prevOrNext)
    onSelectedMonthChange(monthString)
  }
  const selectedMonthToRender = selectedMonth.replace('-', '.')

  useLayoutEffect(() => {
    router.setParams({ selectedMonth: selectedMonth })
  }, [selectedMonth])

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <H3>{selectedMonthToRender}</H3>,
        headerLeft: () => (
          <IconButton icon='arrow-left' onPress={() => handlePress('prev')} />
        ),
        headerRight: () => (
          <IconButton icon='arrow-right' onPress={() => handlePress('next')} />
        ),
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleAlign: 'center',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

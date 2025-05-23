import { Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

import { H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { useCalendar, useColors } from '@/hooks'
import { convertMonthString } from '@/utils'

export default function EntriesLayout() {
  const router = useRouter()
  const { colors } = useColors()
  const { selectedMonth, onSelectedMonthChange, selectedYear } = useCalendar()

  const handlePress = (prevOrNext: 'prev' | 'next') => {
    const monthString = convertMonthString(selectedMonth, prevOrNext)
    onSelectedMonthChange(monthString)
    router.setParams({ selectedYear, selectedMonth: monthString })
  }

  const selectedMonthToRender = selectedMonth.replace('-', '.')

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <H3>{selectedMonthToRender}</H3>,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <IconButton
            mode='contained'
            icon='arrow-left'
            onPress={() => handlePress('prev')}
          />
        ),
        headerRight: () => (
          <IconButton
            mode='contained'
            icon='arrow-right'
            onPress={() => handlePress('next')}
          />
        ),
        contentStyle: {
          backgroundColor: colors.background.pure,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

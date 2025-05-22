import { Stack, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { useCalendar, useColors } from '@/hooks'
import { convertMonthString } from '@/utils'

export default function EntriesLayout() {
  const router = useRouter()
  const { colors } = useColors()
  const { selectedMonth, onSelectedMonthChange, selectedYear } = useCalendar()

  const handleLeftPress = useCallback(() => {
    const monthString = convertMonthString(selectedMonth, 'prev')
    onSelectedMonthChange(monthString)
    router.setParams({ selectedYear, selectedMonth: monthString })
  }, [onSelectedMonthChange, selectedMonth])

  const handleRightPress = useCallback(() => {
    const monthString = convertMonthString(selectedMonth, 'next')
    onSelectedMonthChange(monthString)
    router.setParams({ selectedYear, selectedMonth: monthString })
  }, [onSelectedMonthChange, selectedMonth])

  const selectedMonthToRender = selectedMonth.replace('-', '.')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          header: () => (
            <View style={styles.header}>
              <IconButton
                mode='contained'
                icon='arrow-left'
                onPress={handleLeftPress}
              />
              <H3>{selectedMonthToRender}</H3>
              <IconButton
                mode='contained'
                icon='arrow-right'
                onPress={handleRightPress}
              />
            </View>
          ),
          contentStyle: {
            backgroundColor: colors.background.pure,
          },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: Layout.SPACE.HEADER_VERTICAL_PADDING,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
})

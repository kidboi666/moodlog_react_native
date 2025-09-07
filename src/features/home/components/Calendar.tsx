import { useCallback } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import {
  useJournalCountCalculator,
  useScrollToToday,
} from '@/src/features/home/hooks'
import { LAYOUT } from '@/src/shared/constants'
import { DateCount, ISODateString, Maybe } from '@/src/shared/types'
import { CalendarDateItem } from './CalendarDateItem'

interface Props {
  selectedDate: Maybe<ISODateString>
  onSelectedDateChange: (date: ISODateString) => void
  dateCount?: DateCount
}

export function Calendar({
  selectedDate,
  onSelectedDateChange,
  dateCount,
}: Props) {
  const theme = useTheme()
  const { journalCountByDate, currentDate } =
    useJournalCountCalculator(dateCount)
  const { scrollViewRef } = useScrollToToday(journalCountByDate, selectedDate)

  const getCalendarDateItemColor = useCallback(
    (isFuture: boolean, isSelected: boolean) => {
      if (isFuture) return theme.colors.onSurfaceVariant
      if (isSelected) return theme.colors.primary
      return theme.colors.surface
    },
    [],
  )

  return (
    <View style={styles.calendarContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate='normal'
        snapToAlignment='start'
        snapToInterval={LAYOUT.SPACE.CALENDAR_DATE_ITEM}
      >
        {Object.entries(journalCountByDate).map(([date, journalCount]) => {
          const renderDate = date as ISODateString
          const isToday = currentDate === renderDate
          const isFuture = currentDate < renderDate
          const isSelected = selectedDate === renderDate

          return (
            <CalendarDateItem
              key={renderDate}
              selected={isSelected}
              today={isToday}
              onPress={() => onSelectedDateChange(renderDate)}
              futureDateColor={getCalendarDateItemColor(isFuture, isSelected)}
              date={renderDate}
              journalCount={journalCount}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
})

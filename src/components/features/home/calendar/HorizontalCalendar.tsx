import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { DelayMS, Layout } from '@/src/constants'
import { DateCount, ISODateString, Maybe } from '@/src/types'
import {
  getDateFromISODate,
  getDayIndexFromISODate,
  getISODateString,
  getLastDateOfMonth,
} from '@/src/utils'
import { HorizontalCalendarContent } from './HorizontalCalendarContent'

interface Props {
  selectedDate: Maybe<ISODateString>
  onSelectedDateChange: (date: ISODateString) => void
  dateCount?: DateCount
}

export function HorizontalCalendar({
  selectedDate,
  onSelectedDateChange,
  dateCount,
}: Props) {
  const now = new Date()
  const theme = useTheme()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const currentISODate = getISODateString(currentYear, currentMonth, currentDay)
  const scrollViewRef = useRef<ScrollView>(null)

  const handleSelectedJournalsChange = useCallback(
    (date: ISODateString) => {
      onSelectedDateChange(date)
    },
    [onSelectedDateChange],
  )

  const dates: Record<ISODateString, number> = useMemo(() => {
    const lastDate = getLastDateOfMonth(currentYear, currentMonth)
    const datesWithJournalCount: Record<ISODateString, number> = {}

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = getISODateString(currentYear, currentMonth, i)
      datesWithJournalCount[dateKey] = dateCount?.[dateKey] || 0
    }
    return datesWithJournalCount
  }, [currentYear, currentMonth, dateCount])

  useEffect(() => {
    let timeout: number

    if (selectedDate) {
      const selectedIndex = getDateFromISODate(selectedDate)
      const day = getDayIndexFromISODate(selectedDate) || 7
      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (selectedIndex - day) * Layout.SPACE.CALENDAR_SCROLL_SIZE,
            animated: true,
          })
        }
      }, DelayMS.ANIMATION.LONG)
    }

    return () => clearTimeout(timeout)
  }, [dates, selectedDate])

  useEffect(() => {
    if (selectedDate) {
      handleSelectedJournalsChange(selectedDate)
    }
  }, [handleSelectedJournalsChange, selectedDate])

  return (
    <View style={styles.calendarContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate='normal'
        snapToAlignment='start'
        snapToInterval={Layout.SPACE.CALENDAR_SCROLL_SIZE}
      >
        {Object.entries(dates).map(([date, journalCount]) => {
          const renderDate = date as ISODateString
          const isToday = currentISODate === renderDate
          const isFuture = currentISODate < renderDate
          const isSelected = selectedDate === renderDate
          const dateColor = isFuture
            ? theme.colors.onSurfaceVariant
            : isSelected
              ? theme.colors.primary
              : theme.colors.surface
          return (
            <HorizontalCalendarContent
              key={renderDate}
              selected={isSelected}
              today={isToday}
              onPress={() => handleSelectedJournalsChange(renderDate)}
              futureDateColor={dateColor}
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

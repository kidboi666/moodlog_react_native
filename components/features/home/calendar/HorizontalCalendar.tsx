import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, styled } from 'tamagui'

import { CALENDAR_SCROLL_SIZE, MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'
import { useCalendar } from '@/hooks'
import { useJournal } from '@/store'
import type { ISODateString } from '@/types'
import {
  getDateFromISODate,
  getDayIndexFromISODate,
  getISODateString,
  getLastDate,
} from '@/utils'

import { HorizontalCalendarContent } from './HorizontalCalendarContent'

const CalendarContainer = styled(XStack, {
  animation: 'quick',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
  flex: 1,
  justify: 'center',
  rounded: '$4',
  items: 'center',
})

export const HorizontalCalendar = () => {
  const selectJournals = useJournal(state => state.selectJournals)
  const getCountForDate = useJournal(state => state.getCountForDate)
  const scrollViewRef = useRef<ScrollView>(null)
  const {
    currentYear,
    currentMonth,
    onSelectedDateChange,
    selectedDate,
    isToday,
    isFuture,
    isSelected,
  } = useCalendar()

  const handleCalendarDateChange = useCallback(
    (date: ISODateString) => {
      onSelectedDateChange(date)
      selectJournals(date)
    },
    [onSelectedDateChange, selectJournals],
  )

  const dates: Record<ISODateString, number> = useMemo(() => {
    const lastDate = getLastDate(currentYear, currentMonth)
    const datesWithJournalCount: Record<ISODateString, number> = {}

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = getISODateString(currentYear, currentMonth, i)
      datesWithJournalCount[dateKey] = getCountForDate(
        currentYear,
        currentMonth,
        i,
      )
    }
    return datesWithJournalCount
  }, [currentYear, currentMonth, getCountForDate])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (selectedDate) {
      const selectedIndex = getDateFromISODate(selectedDate)
      const day = getDayIndexFromISODate(selectedDate) || 7
      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (selectedIndex - day) * CALENDAR_SCROLL_SIZE,
            animated: true,
          })
        }
      }, 1300)
    }

    return () => clearTimeout(timeout)
  }, [dates, selectedDate])

  useEffect(() => {
    selectJournals(selectedDate)
  }, [])

  return (
    <CalendarContainer>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate='normal'
        snapToAlignment='start'
        snapToInterval={CALENDAR_SCROLL_SIZE}
      >
        {Object.entries(dates).map(([date, journalCount]) => {
          const isoDate = date as ISODateString
          const dateColor = isFuture(isoDate)
            ? '$color11'
            : isSelected(isoDate)
              ? '$color12'
              : '$color6'
          return (
            <HorizontalCalendarContent
              key={isoDate}
              selected={isSelected(isoDate)}
              today={isToday(isoDate)}
              onPress={() => handleCalendarDateChange(isoDate)}
              futureDateColor={dateColor}
              date={isoDate}
              journalCount={journalCount}
            />
          )
        })}
      </ScrollView>
    </CalendarContainer>
  )
}

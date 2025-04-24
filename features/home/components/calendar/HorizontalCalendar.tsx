import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ScrollView, XStack, styled } from 'tamagui'

import { useJournal } from '@/store'
import {
  CALENDAR_SCROLL_SIZE,
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
} from 'shared/constants'
import { useCalendar } from 'shared/hooks'
import { JournalService } from 'shared/services'
import type { ISODateString } from 'shared/types'
import {
  getDateFromISODate,
  getDayIndexFromISODate,
  getISODateString,
  getLastDate,
} from 'shared/utils'

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
  const store = useJournal(state => state.store)
  const indexes = useJournal(state => state.store.indexes)
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

  const handlePress = useCallback(
    (date: ISODateString) => {
      const selectedJournals = JournalService.getJournals(store, date)
      onSelectedDateChange(date)
      selectJournals(selectedJournals)
    },
    [onSelectedDateChange, selectJournals],
  )

  const dates: Record<ISODateString, number> = useMemo(() => {
    const lastDate = getLastDate(currentYear, currentMonth)
    const datesWithJournalCount: Record<ISODateString, number> = {}

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = getISODateString(currentYear, currentMonth, i)
      datesWithJournalCount[dateKey] = JournalService.getCountForDate(
        indexes,
        currentYear,
        currentMonth,
        i,
      )
    }
    return datesWithJournalCount
  }, [currentYear, currentMonth])

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
              onPress={() => handlePress(isoDate)}
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

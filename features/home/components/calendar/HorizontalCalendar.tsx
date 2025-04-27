import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ScrollView, XStack, styled } from 'tamagui'

import { HorizontalCalendarContent } from '@/features/home/components'
import { JournalUtils } from '@/features/journal/utils'
import {
  DelayMS,
  Layout,
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
} from '@/shared/constants'
import { useCalendar } from '@/shared/hooks'
import { useJournal } from '@/shared/store'
import { ISODateString } from '@/shared/types'
import { DateUtils } from '@/shared/utils'

export const HorizontalCalendar = () => {
  const selectJournals = useJournal(state => state.selectJournals)
  const journals = useJournal(state => state.store.journals)
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

  const handleSelectedJournalsChange = useCallback(
    (date: ISODateString) => {
      const selectedJournals = JournalUtils.getJournals(
        { journals, indexes },
        date,
      )
      onSelectedDateChange(date)
      selectJournals(selectedJournals)
    },
    [onSelectedDateChange, journals, indexes, selectJournals],
  )

  const dates: Record<ISODateString, number> = useMemo(() => {
    const lastDate = DateUtils.getLastDate(currentYear, currentMonth)
    const datesWithJournalCount: Record<ISODateString, number> = {}

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = DateUtils.getISODateString(currentYear, currentMonth, i)
      datesWithJournalCount[dateKey] = JournalUtils.getCountForDate(
        indexes,
        currentYear,
        currentMonth,
        i,
      )
    }
    return datesWithJournalCount
  }, [currentYear, currentMonth, indexes])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (selectedDate) {
      const selectedIndex = DateUtils.getDateFromISODate(selectedDate)
      const day = DateUtils.getDayIndexFromISODate(selectedDate) || 7
      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (selectedIndex - day) * Layout.SPACE.CALENDAR_SCROLL_SIZE,
            animated: true,
          })
        }
      }, DelayMS.ANIMATION.LONG[0])
    }

    return () => clearTimeout(timeout)
  }, [dates, selectedDate])

  useEffect(() => {
    if (selectedDate) {
      handleSelectedJournalsChange(selectedDate)
    }
  }, [])

  return (
    <CalendarContainer>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate='normal'
        snapToAlignment='start'
        snapToInterval={Layout.SPACE.CALENDAR_SCROLL_SIZE}
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
              onPress={() => handleSelectedJournalsChange(isoDate)}
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

const CalendarContainer = styled(XStack, {
  animation: 'quick',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
  flex: 1,
  justify: 'center',
  rounded: '$4',
  items: 'center',
})

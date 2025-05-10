import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ScrollView, XStack, styled } from 'tamagui'

import { DelayMS, Layout, MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'
import { DateCount, ISODateString, Maybe } from '@/types'
import { DateUtils } from '@/utils'
import { HorizontalCalendarContent } from './HorizontalCalendarContent'

interface Props {
  selectedDate: Maybe<ISODateString>
  onSelectedDateChange: (date: ISODateString) => void
  dateCount: DateCount
}

export function HorizontalCalendar({
  selectedDate,
  onSelectedDateChange,
  dateCount,
}: Props) {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const currentISODate = DateUtils.getISODateString(
    currentYear,
    currentMonth,
    currentDay,
  )
  const scrollViewRef = useRef<ScrollView>(null)

  const handleSelectedJournalsChange = useCallback(
    (date: ISODateString) => {
      onSelectedDateChange(date)
    },
    [onSelectedDateChange],
  )

  const dates: Record<ISODateString, number> = useMemo(() => {
    const lastDate = DateUtils.getLastDate(currentYear, currentMonth)
    const datesWithJournalCount: Record<ISODateString, number> = {}

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = DateUtils.getISODateString(currentYear, currentMonth, i)
      datesWithJournalCount[dateKey] = dateCount[dateKey] || 0
    }
    return datesWithJournalCount
  }, [currentYear, currentMonth])

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
      <StyledScrollView ref={scrollViewRef}>
        {Object.entries(dates).map(([date, journalCount]) => {
          const renderDate = date as ISODateString
          const isToday = currentISODate === renderDate
          const isFuture = currentISODate < renderDate
          const isSelected = selectedDate === renderDate
          const dateColor = isFuture
            ? '$color11'
            : isSelected
              ? '$color12'
              : '$color6'
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
      </StyledScrollView>
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

const StyledScrollView = styled(ScrollView, {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  decelerationRate: 'normal',
  snapToAlignment: 'start',
  snapToInterval: Layout.SPACE.CALENDAR_SCROLL_SIZE,
})

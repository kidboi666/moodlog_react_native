import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import React, { memo, useCallback, useMemo } from 'react'
import {
  Calendar,
  type CalendarProps,
  CalendarUtils,
  type DateData,
} from 'react-native-calendars'
import type { DayProps } from 'react-native-calendars/src/calendar/day'
import type { Direction } from 'react-native-calendars/src/types'

import { ArrowButton } from '@/core/components/features/calendar/ArrowButton'
import { CalendarCustomHeader } from '@/core/components/features/calendar/CalendarCustomHeader'
import { CustomDayComponent } from '@/core/components/features/calendar/CustomDayComponent'
import type {
  DateCounts,
  ISODateString,
  ISOMonthString,
} from '@/types/date.types'
import { getISOMonthString } from '@/utils/date'

interface Props extends CalendarProps {
  dateCounts: DateCounts
  onSelectedDateChange: (date: ISODateString) => void
  onSelectedMonthChange: (month: ISOMonthString) => void
  selectedDate?: ISODateString
  pastScrollRange: number
  futureScrollRange: number
}

export const CalendarListBase = memo(
  ({
    dateCounts,
    pastScrollRange,
    futureScrollRange,
    onSelectedDateChange,
    onSelectedMonthChange,
    selectedDate,
    ...props
  }: Props) => {
    const handleDayPress = useCallback(
      (date: DateData) => {
        onSelectedDateChange(date.dateString as ISODateString)
      },
      [onSelectedDateChange],
    )

    const markedDates = useMemo(() => {
      if (selectedDate) {
        return {
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
          },
        }
      }
      return {}
    }, [selectedDate])

    const DayComponentWrapper = useCallback(
      (props: DayProps) => {
        const { date, state, marking } = props

        if (!date) {
          return null
        }

        return (
          <CustomDayComponent
            date={date as unknown as DateData}
            state={state!}
            dateCounts={dateCounts}
            marking={marking!}
            onPress={() => handleDayPress(date as unknown as DateData)}
          />
        )
      },
      [dateCounts, handleDayPress],
    )

    const renderHeader = useCallback(
      (date: any) => <CalendarCustomHeader date={date} />,
      [],
    )

    const renderArrow = useCallback(
      (direction: Direction) =>
        direction === 'left' ? (
          <ArrowButton icon={ArrowLeft} />
        ) : (
          <ArrowButton icon={ArrowRight} />
        ),
      [],
    )

    return (
      <Calendar
        renderHeader={renderHeader}
        dayComponent={DayComponentWrapper}
        pastScrollRange={pastScrollRange}
        futureScrollRange={futureScrollRange}
        onMonthChange={({ dateString }: Pick<DateData, 'dateString'>) =>
          onSelectedMonthChange(
            getISOMonthString(
              new Date(dateString).getFullYear(),
              new Date(dateString).getMonth(),
            ),
          )
        }
        hideExtraDays
        current={selectedDate}
        maxDate={CalendarUtils.getCalendarDateString(new Date())}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        renderArrow={renderArrow}
        enableSwipeMonths
        animateScroll
        {...props}
      />
    )
  },
)

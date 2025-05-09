import { useCallback, useState } from 'react'
import { CalendarUtils } from 'react-native-calendars'

import { type ISODateString, type ISOMonthString, Maybe } from '@/types'
import { DateUtils } from '@/utils'

export const useCalendar = () => {
  const now = new Date()
  const todayString: ISODateString = CalendarUtils.getCalendarDateString(now)
  const [selectedDate, setSelectedDate] =
    useState<Maybe<ISODateString>>(todayString)
  const [selectedMonth, setSelectedMonth] = useState<Maybe<ISOMonthString>>(
    todayString.substring(0, 7) as ISOMonthString,
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    Number(todayString.split('-')[0]),
  )
  const [selectedWeek, setSelectedWeek] = useState(
    DateUtils.getThisWeekIndex(todayString),
  )

  const handleSelectedDateChange = useCallback((date: Maybe<ISODateString>) => {
    setSelectedDate(date)
  }, [])

  const handleSelectedMonthChange = useCallback(
    (month: Maybe<ISOMonthString>) => {
      setSelectedMonth(month)
    },
    [],
  )

  const handleSelectedYearChange = useCallback((year: number) => {
    setSelectedYear(year)
  }, [])

  const handleSelectedWeekChange = useCallback((date: ISODateString) => {
    setSelectedWeek(DateUtils.getThisWeekIndex(date))
  }, [])

  return {
    now,
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
    currentDate: now.getDate(),
    currentDay: now.getDay(),
    todayString,
    currentHour: now.getHours(),
    currentMinute: now.getMinutes(),

    selectedDate,
    selectedMonth,
    selectedYear,
    selectedWeek,
    onSelectedDateChange: handleSelectedDateChange,
    onSelectedMonthChange: handleSelectedMonthChange,
    onSelectedYearChange: handleSelectedYearChange,
    onSelectedWeekChange: handleSelectedWeekChange,

    isToday: (date: Maybe<ISODateString | ISOMonthString>) =>
      date === todayString,
    isSelected: (date: ISODateString) => date === selectedDate,
    isSelectedMonth: (month: ISOMonthString) => month === selectedMonth,
    isFuture: (date: ISODateString) => date > todayString,
  }
}

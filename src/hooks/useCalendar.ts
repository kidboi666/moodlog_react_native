import { useCallback, useState } from 'react'
import { CalendarUtils } from 'react-native-calendars'

import { type ISODateString, type ISOMonthString, ISOString } from '@/types'
import { getThisWeekIndex } from '@/utils'

export const useCalendar = () => {
  const now = new Date()
  const todayString = CalendarUtils.getCalendarDateString(now)
  const initMonth = todayString.substring(0, 7) as ISOMonthString
  const initYear = Number(todayString.split('-')[0])
  const [selectedDate, setSelectedDate] = useState<ISODateString>(todayString)
  const [selectedMonth, setSelectedMonth] = useState<ISOMonthString>(initMonth)
  const [selectedYear, setSelectedYear] = useState<number>(initYear)
  const [selectedWeek, setSelectedWeek] = useState(
    getThisWeekIndex(todayString),
  )

  const handleSelectedDateChange = useCallback((date: ISODateString) => {
    setSelectedDate(date)
  }, [])

  const handleSelectedMonthChange = useCallback((month: ISOMonthString) => {
    setSelectedMonth(month)
  }, [])

  const handleSelectedYearChange = useCallback((year: number) => {
    setSelectedYear(year)
  }, [])

  const handleSelectedWeekChange = useCallback((date: ISODateString) => {
    setSelectedWeek(getThisWeekIndex(date))
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

    isToday: (date: ISOString) => date === todayString,
    isSelected: (date: ISODateString) => date === selectedDate,
    isSelectedMonth: (month: ISOMonthString) => month === selectedMonth,
    isFuture: (date: ISODateString) => date > todayString,
  }
}

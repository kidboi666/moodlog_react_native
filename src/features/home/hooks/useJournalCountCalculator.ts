import { useMemo } from 'react'

import { DateCount, ISODateString } from '@/src/shared/types'
import { getISODateString, getLastDateOfMonth } from '@/src/shared/utils'

export function useJournalCountCalculator(dateCount?: DateCount) {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const currentDate = getISODateString(currentYear, currentMonth, currentDay)

  const journalCountByDate: Record<ISODateString, number> = useMemo(() => {
    const lastDate = getLastDateOfMonth(currentYear, currentMonth)
    const datesWithJournalCount: Record<ISODateString, number> = {}

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = getISODateString(currentYear, currentMonth, i)
      datesWithJournalCount[dateKey] = dateCount?.[dateKey] || 0
    }
    return datesWithJournalCount
  }, [currentYear, currentMonth, dateCount])

  return {
    journalCountByDate,
    currentDate,
  }
}

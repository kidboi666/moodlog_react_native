import { useMemo } from 'react'

import { type ISOMonthString, TimeRange } from '@/shared/types'
import { StatisticService } from 'shared/services'
import { useJournal } from 'shared/store'

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) => {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useJournal(state => state.isLoading)

  const yearlyStats = useMemo(
    () =>
      StatisticService.getYearlyStats(
        journals,
        indexes,
        timeRange,
        selectedYear,
      ),
    [journals, indexes, timeRange, selectedYear],
  )

  const monthlyStats = useMemo(
    () =>
      StatisticService.getMonthlyStats(
        journals,
        indexes,
        timeRange,
        selectedMonth,
      ),
    [journals, indexes, timeRange, selectedMonth],
  )

  const initialStats = (timeRange: TimeRange) => {
    switch (timeRange) {
      case TimeRange.YEARLY:
        return yearlyStats
      case TimeRange.MONTHLY:
        return monthlyStats
      default:
        return yearlyStats
    }
  }

  return {
    stats: initialStats(timeRange),
    isLoading,
  }
}

import { useMemo } from 'react'

import { StatisticUtils } from '@/features/statistic/utils'
import { useJournal, useUI } from '@/shared/store'
import { type ISOMonthString, TimeRange } from '@/shared/types'

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) => {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useUI(state => state.isLoading)

  const yearlyStats = useMemo(
    () =>
      StatisticUtils.getYearlyStats(journals, indexes, timeRange, selectedYear),
    [journals, indexes, timeRange, selectedYear],
  )

  const monthlyStats = useMemo(
    () =>
      StatisticUtils.getMonthlyStats(
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

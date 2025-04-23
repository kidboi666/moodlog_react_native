import { useMemo } from 'react'

import { StatisticService } from '@/services'
import { useJournal } from '@/store'
import { type ISOMonthString, TimeRange } from '@/types'

export function useJournalStats(
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useJournal(state => state.isLoading)

  const yearlyStats = useMemo(() => {
    return StatisticService.getYearlyStats(
      journals,
      indexes,
      timeRange,
      selectedYear,
    )
  }, [journals, indexes, timeRange, selectedYear])

  const monthlyStats = useMemo(() => {
    return StatisticService.getMonthlyStats(
      journals,
      indexes,
      timeRange,
      selectedMonth,
    )
  }, [journals, indexes, timeRange, selectedMonth])

  const stats = timeRange === TimeRange.YEARLY ? yearlyStats : monthlyStats

  return {
    stats,
    isLoading,
  }
}

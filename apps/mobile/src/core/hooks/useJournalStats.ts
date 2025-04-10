import { useMemo } from 'react'

import { Statistics } from '@/core/services/statistics.service'
import { useJournal } from '@/core/store/journal.store'
import type { ISOMonthString } from '@/types/date.types'
import { TimeRange } from '@/types/statistic.types'

export function useJournalStats(
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useJournal(state => state.isLoading)

  const yearlyStats = useMemo(() => {
    return Statistics.getYearlyStats(journals, indexes, timeRange, selectedYear)
  }, [journals, indexes, timeRange, selectedYear])

  const monthlyStats = useMemo(() => {
    return Statistics.getMonthlyStats(
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

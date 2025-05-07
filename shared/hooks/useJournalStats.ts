import { useMemo } from 'react'

import { StatisticUtils } from '@/features/statistic/utils'
import { useJournal, useMood } from '@/shared/store'
import { type ISOMonthString, TimeRange } from '@/shared/types'

export function useJournalStats(
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) {
  const store = useJournal(state => state.store)
  const moods = useMood(state => state.moods)

  const yearlyStats = useMemo(() => {
    return StatisticUtils.getYearlyStats(store, moods, timeRange, selectedYear)
  }, [store.journals, store.indexes, moods, timeRange, selectedYear])

  const monthlyStats = useMemo(() => {
    return StatisticUtils.getMonthlyStats(
      store,
      moods,
      timeRange,
      selectedMonth,
    )
  }, [store.journals, store.indexes, moods, timeRange, selectedMonth])

  const stats = timeRange === TimeRange.YEARLY ? yearlyStats : monthlyStats

  return {
    stats,
  }
}

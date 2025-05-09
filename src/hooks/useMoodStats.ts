import { useMemo } from 'react'

import { useJournal, useMood, useUI } from '@/store'
import { type ISOMonthString, TimeRange } from '@/types'
import { StatisticUtils } from '@/utils'

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) => {
  const journalStore = useJournal(state => state.store)
  const moods = useMood(state => state.moods)
  const isLoading = useUI(state => state.isLoading)

  const yearlyStats = useMemo(
    () =>
      StatisticUtils.getYearlyStats(
        journalStore,
        moods,
        timeRange,
        selectedYear,
      ),
    [journalStore, moods, timeRange, selectedYear],
  )

  const monthlyStats = useMemo(
    () =>
      StatisticUtils.getMonthlyStats(
        journalStore,
        moods,
        timeRange,
        selectedMonth,
      ),
    [journalStore, moods, timeRange, selectedMonth],
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

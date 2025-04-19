import { useMemo } from 'react'

import { Statistics } from '@/services'
import { useApp, useJournal } from '@/store'
import { type ISOMonthString, TimeRange } from '@/types'

export const useMoodStats = (
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) => {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useJournal(state => state.isLoading)
  const emotionDisplayType = useApp(state => state.settings.emotionDisplayType)
  const emotionDisplaySettings = useApp(
    state => state.settings.emotionDisplaySettings || {},
  )

  const yearlyStats = useMemo(
    () =>
      Statistics.getYearlyStats(
        journals,
        indexes,
        timeRange,
        selectedYear,
        emotionDisplayType,
        emotionDisplaySettings,
      ),
    [
      journals,
      indexes,
      timeRange,
      selectedYear,
      emotionDisplayType,
      emotionDisplaySettings,
    ],
  )

  const monthlyStats = useMemo(
    () =>
      Statistics.getMonthlyStats(
        journals,
        indexes,
        timeRange,
        selectedMonth,
        emotionDisplayType,
        emotionDisplaySettings,
      ),
    [
      journals,
      indexes,
      timeRange,
      selectedMonth,
      emotionDisplayType,
      emotionDisplaySettings,
    ],
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

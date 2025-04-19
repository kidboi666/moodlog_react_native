import { useMemo } from 'react'

import { Statistics } from '@/services'
import { useApp, useJournal } from '@/store'
import { type ISOMonthString, TimeRange } from '@/types'

export function useJournalStats(
  timeRange: TimeRange,
  selectedYear: number,
  selectedMonth: ISOMonthString,
) {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)
  const isLoading = useJournal(state => state.isLoading)
  const emotionDisplayType = useApp(state => state.settings.emotionDisplayType)
  const emotionDisplaySettings = useApp(
    state => state.settings.emotionDisplaySettings || {},
  )

  const yearlyStats = useMemo(() => {
    return Statistics.getYearlyStats(
      journals,
      indexes,
      timeRange,
      selectedYear,
      emotionDisplayType,
      emotionDisplaySettings,
    )
  }, [
    journals,
    indexes,
    timeRange,
    selectedYear,
    emotionDisplayType,
    emotionDisplaySettings,
  ])

  const monthlyStats = useMemo(() => {
    return Statistics.getMonthlyStats(
      journals,
      indexes,
      timeRange,
      selectedMonth,
      emotionDisplayType,
      emotionDisplaySettings,
    )
  }, [
    journals,
    indexes,
    timeRange,
    selectedMonth,
    emotionDisplayType,
    emotionDisplaySettings,
  ])

  const stats = timeRange === TimeRange.YEARLY ? yearlyStats : monthlyStats

  return {
    stats,
    isLoading,
  }
}

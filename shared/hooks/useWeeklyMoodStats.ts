import { useMemo } from 'react'

import { StatisticUtils } from '@/features/statistic/utils'
import { useJournal } from '@/shared/store'
import { type ISODateString } from '@/shared/types'

export const useWeeklyMoodStats = (selectedDate: ISODateString) => {
  const journalStore = useJournal(state => state.store)

  const weeklyMoodStats = useMemo(
    () => StatisticUtils.getWeeklyStats(journalStore, selectedDate),
    [journalStore, selectedDate],
  )

  return {
    stats: weeklyMoodStats,
  }
}

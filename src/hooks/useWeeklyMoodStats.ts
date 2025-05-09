import { useMemo } from 'react'

import { useJournal } from '@/store'
import { type ISODateString } from '@/types'
import { StatisticUtils } from '@/utils'

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

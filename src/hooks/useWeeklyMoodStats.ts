import { useMemo } from 'react'

import { useJournal } from '@/store'
import { type ISODateString } from '@/types'
import { getWeeklyStats } from '@/utils'

export const useWeeklyMoodStats = (selectedDate: ISODateString) => {
  const journalStore = useJournal(state => state.store)

  const weeklyMoodStats = useMemo(
    () => getWeeklyStats(journalStore, selectedDate),
    [journalStore, selectedDate],
  )

  return {
    stats: weeklyMoodStats,
  }
}

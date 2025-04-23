import { useMemo } from 'react'

import { StatisticService } from '@/services'
import { useJournal } from '@/store'
import { type ISODateString } from '@/types'

export const useWeeklyMoodStats = (selectedDate: ISODateString) => {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)

  const weeklyMoodStats = useMemo(
    () => StatisticService.getWeeklyStats(journals, indexes, selectedDate),
    [journals, indexes, selectedDate],
  )

  return {
    stats: weeklyMoodStats,
  }
}

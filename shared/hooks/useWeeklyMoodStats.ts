import { useMemo } from 'react'

import { type ISODateString } from '@/shared/types'
import { useJournal } from '@/store'
import { StatisticService } from 'shared/services'

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

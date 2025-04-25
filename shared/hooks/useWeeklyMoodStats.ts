import { useMemo } from 'react'

import { type ISODateString } from '@/shared/types'
import { StatisticService } from 'shared/services'
import { useJournal } from 'shared/store'

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

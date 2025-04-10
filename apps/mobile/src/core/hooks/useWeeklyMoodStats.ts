import { useMemo } from 'react'

import { Statistics } from '@/core/services/statistics.service'
import { useJournal } from '@/core/store/journal.store'
import type { ISODateString } from '@/types/date.types'

export const useWeeklyMoodStats = (selectedDate: ISODateString) => {
  const journals = useJournal(state => state.store.journals)
  const indexes = useJournal(state => state.store.indexes)

  const weeklyMoodStats = useMemo(
    () => Statistics.getWeeklyStats(journals, indexes, selectedDate),
    [journals, indexes, selectedDate],
  )

  return {
    stats: weeklyMoodStats,
  }
}

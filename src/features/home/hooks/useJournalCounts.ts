import { JournalQueries } from '@/src/data/queries'
import { ISODateString } from '@/src/shared/types'
import { getCountForDate, getISOMonthString } from '@/src/shared/utils'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useJournalCounts(selectedDate: ISODateString) {
  const { data, isLoading } = useQuery(
    JournalQueries.getJournalsByMonth(getISOMonthString(selectedDate)),
  )
  const dateCount = useMemo(() => data && getCountForDate(data), [data])

  return {
    dateCount,
    isLoading,
  }
}

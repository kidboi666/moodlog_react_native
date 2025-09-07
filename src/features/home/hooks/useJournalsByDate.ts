import { JournalQueries } from '@/src/data/queries'
import { ISODateString } from '@/src/shared/types'
import { useQuery } from '@tanstack/react-query'

export function useJournalsByDate(selectedDate: ISODateString) {
  const { data, isLoading } = useQuery(
    JournalQueries.getJournalsByDate(selectedDate),
  )
  const selectedDateJournals = data?.filter(
    journal => journal.localDate === selectedDate,
  )

  return {
    journals: selectedDateJournals,
    isLoading,
  }
}

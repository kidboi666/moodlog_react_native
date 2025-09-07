import { JournalQueries } from '@/src/data/queries'
import { toSingle } from '@/src/shared/utils'
import { useQuery } from '@tanstack/react-query'

export function useJournalDetail(journalId: number) {
  const {
    data: journal,
    isLoading,
    error,
  } = useQuery(JournalQueries.getJournalById(Number(toSingle(journalId))))

  return { journal, isLoading, error }
}

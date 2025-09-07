import { useQuery } from '@tanstack/react-query'

import { JournalQueries } from '@/src/data/queries'
import { ISOMonthString } from '@/src/shared/types'
import { groupJournalsByDate, groupJournalsByMonth } from '@/src/shared/utils'

export function useMonthlyEntries(selectedMonth: ISOMonthString) {
  const { data: journals, isLoading } = useQuery(
    JournalQueries.getJournalsByMonth(selectedMonth),
  )
  const groupedJournalsByMonth = journals && groupJournalsByMonth(journals)
  const monthlyJournals = groupedJournalsByMonth?.[selectedMonth] || []
  const groupedJournalsByDate = groupJournalsByDate(monthlyJournals)

  return { journals: groupedJournalsByDate, isLoading }
}

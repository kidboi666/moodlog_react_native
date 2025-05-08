import { JournalService } from '@/features/journal/services'
import { LocalDate, TimeRange } from '@/shared/types'
import { queryOptions } from '@tanstack/react-query'

export class JournalsQueries {
  static getJournal(journalId: string) {
    return queryOptions({
      queryKey: ['journal', journalId],
      queryFn: () => JournalService.getJournal(journalId),
    })
  }

  static getJournals(timeRange: TimeRange, localDate: LocalDate) {
    return queryOptions({
      queryKey: ['journals', timeRange, localDate],
      queryFn: () => JournalService.getJournals(timeRange, localDate),
    })
  }
}

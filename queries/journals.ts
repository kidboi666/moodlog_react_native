import { JournalService } from '@/services/journal.service'
import { queryOptions } from '@tanstack/react-query'
import { LocalDate, Maybe, TimeRange } from 'types'

export class JournalQueries {
  static getJournal(journalId: string) {
    return queryOptions({
      queryKey: ['journal', journalId],
      queryFn: () => JournalService.getJournal(journalId),
    })
  }

  static getJournals(timeRange: TimeRange, localDate: Maybe<LocalDate>) {
    return queryOptions({
      queryKey: ['journals', timeRange, localDate],
      queryFn: () => JournalService.getJournals(timeRange, localDate),
    })
  }
}

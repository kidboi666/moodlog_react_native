import { queryOptions } from '@tanstack/react-query'

import { JournalService } from '@/services'
import { ISOString, Maybe, TimeRange } from '@/types'

export class JournalQueries {
  static getJournalById(journalId: string) {
    return queryOptions({
      queryKey: ['journal', journalId],
      queryFn: () => JournalService.getJournalById(journalId),
    })
  }

  static getJournals(timeRange: TimeRange, localDate: Maybe<ISOString>) {
    return queryOptions({
      queryKey: ['journals', timeRange, localDate],
      queryFn: () => JournalService.getJournals(timeRange, localDate),
    })
  }
}

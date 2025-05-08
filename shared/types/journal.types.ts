import { journals } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import type { ISODateString, ISOMonthString } from './date.types'

export type Journal = InferSelectModel<typeof journals>

export type Journals = Record<string, Journal>

export type JournalDraft = {
  content: string
  moodId: string
  moodLevel: string
  imageUri: string[]
  localDate: ISODateString
}

export type YearIndexes = Record<number, string[]>
export type MonthIndexes = Record<ISOMonthString, string[]>
export type DateIndexes = Record<ISODateString, string[]>
export type SelectedJournalsByDate = Journal[] | ISODateString | null
export type SelectedJournalsByMonth = Omit<
  SelectedJournalsByDate,
  'ISODateString'
> &
  ISOMonthString
export type SelectedJournal = Journal | null
export type SelectedJournals = SelectedJournalsByDate | SelectedJournalsByMonth
export type JournalIndexes = {
  byYear: YearIndexes
  byMonth: MonthIndexes
  byDate: DateIndexes
}

export type JournalStore = {
  journals: Journals
  indexes: JournalIndexes
}

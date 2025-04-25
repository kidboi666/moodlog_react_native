import type { ISODateString, ISOMonthString } from './date.types'
import type { JournalMood } from './mood.types'

export type Journal = {
  id: string
  content: string
  mood: JournalMood
  createdAt: string
  localDate: ISODateString // YYYY-MM-DD
  imageUri: string[]
}

export type Journals = Record<string, Journal>

export type Draft = {
  content: string
  mood: JournalMood
  imageUri: string[]
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
